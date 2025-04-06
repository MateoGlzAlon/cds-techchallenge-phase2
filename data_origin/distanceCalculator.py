from neo4j import GraphDatabase

uri = "bolt://neo4j:7687"
user = "neo4j"
password = "12345678"

class TransportePlanner:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def calcular_opciones_transporte(self):
        with self.driver.session() as session:
            puntos = session.run("MATCH (p:Punto) RETURN p.nombre AS nombre").data()
            nombres = [p['nombre'] for p in puntos]

            for origen in nombres:
                for destino in nombres:
                    if origen != destino:
                        propiedades = {}
                        for medio in ["Bicicleta", "Tranvía", "Coche Compartido", "Metro", "Taxi", "Autobús"]:
                            duracion = self.buscar_ruta_medio(session, origen, destino, medio)
                            if duracion is not None:
                                propiedades[medio] = duracion
                        if propiedades:
                            session.run("""
                                MATCH (a:Punto {nombre: $origen}), (b:Punto {nombre: $destino})
                                MERGE (a)-[r:OPCIONES]->(b)
                                SET r += $props
                            """, origen=origen, destino=destino, props=propiedades)

    def buscar_ruta_medio(self, session, origen, destino, medio):
        # Intentar trayecto directo
        result = session.run("""
            MATCH (a:Punto {nombre: $origen})-[t:TRAYECTO {tipo_transporte: $medio}]->(b:Punto {nombre: $destino})
            RETURN t.duracion AS duracion
        """, origen=origen, destino=destino, medio=medio).single()

        if result:
            return result['duracion']

        # Buscar camino con puntos intermedios (2 a 4 trayectos consecutivos)
        result = session.run("""
            MATCH path=(a:Punto {nombre: $origen})-[:TRAYECTO*2..4 {tipo_transporte: $medio}]->(b:Punto {nombre: $destino})
            WITH reduce(duracion = 0, r IN relationships(path) | duracion + r.duracion) AS duracion
            RETURN duracion ORDER BY duracion ASC LIMIT 1
        """, origen=origen, destino=destino, medio=medio).single()

        return result['duracion'] if result else None

# Ejecutar
print(">>> Ejecutando distanceCalculator.py")
planner = TransportePlanner(uri, user, password)
planner.calcular_opciones_transporte()
planner.close()
print(">>> distanceCalculator.py finalizado")

