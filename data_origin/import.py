from neo4j import GraphDatabase
import pandas as pd

# Configuración de conexión a Neo4j
URI = "bolt://neo4j:7687"
USER = "neo4j"
PASSWORD = "12345678"

def normalizar_nombre(nombre):
    return str(nombre).strip().lower().title()

# Cargar datos desde CSV
file_ocupacion = "ocupacion_hotelera.csv"
file_sostenibilidad = "datos_sostenibilidad.csv"
file_rutas = "csv_rutas.csv"
file_transporte = "csv_transportes.csv"

df_ocupacion = pd.read_csv(file_ocupacion)
df_sostenibilidad = pd.read_csv(file_sostenibilidad)
df_rutas = pd.read_csv(file_rutas, sep=";")
df_transporte = pd.read_csv(file_transporte, sep=";")

df_ocupacion.columns = df_ocupacion.columns.str.strip().str.lower()
df_sostenibilidad.columns = df_sostenibilidad.columns.str.strip().str.lower()
df_rutas.columns = df_rutas.columns.str.strip().str.lower()
df_transporte.columns = df_transporte.columns.str.strip().str.lower()

# Unir los datos por hotel y fecha
df_merged = pd.merge(df_ocupacion, df_sostenibilidad, on=["hotel_nombre", "fecha"], how="inner")

# Verificar si la fusión tiene datos
if df_merged.empty:
    exit()

# Conectar a Neo4j
driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))

def create_hotel_nodes(tx, hotel_name):
    query = """
    MERGE (h:Hotel {nombre: $hotel_name})
    """
    tx.run(query, hotel_name=hotel_name)

def create_date_nodes(tx, row):
    query = """
    MERGE (h:Hotel {nombre: $hotel_nombre})
    CREATE (d:Fecha {fecha: $fecha, hotel_nombre: $hotel_nombre, tasa_ocupacion: $tasa_ocupacion, reservas: $reservas,
                     cancelaciones: $cancelaciones, precio_promedio: $precio,
                     consumo_energia_kwh: $consumo_energia_kwh, residuos_generados_kg: $residuos_generados_kg,
                     porcentaje_reciclaje: $porcentaje_reciclaje, uso_agua_m3: $uso_agua_m3})
    MERGE (h)-[:TIENE_OCUPACION]->(d)
    """
    tx.run(query, hotel_nombre=row["hotel_nombre"], fecha=row["fecha"], 
           tasa_ocupacion=row["tasa_ocupacion"], reservas=row["reservas_confirmadas"],
           cancelaciones=row["cancelaciones"], precio=row["precio_promedio_noche"],
           consumo_energia_kwh=row["consumo_energia_kwh"], residuos_generados_kg=row["residuos_generados_kg"],
           porcentaje_reciclaje=row["porcentaje_reciclaje"], uso_agua_m3=row["uso_agua_m3"])

def create_punto_node(tx, nombre):
    query = """
    MERGE (p:Punto {nombre: $nombre})
    """
    tx.run(query, nombre=nombre)

def create_ruta_relationship(tx, origen, destino, num_usuarios=None, duracion=None, tipo_transporte=None):
    query = """
    MATCH (o:Punto {nombre: $origen})
    MATCH (d:Punto {nombre: $destino})
    MERGE (o)-[r:RUTA]->(d)
    SET r.num_usuarios = $num_usuarios,
        r.duracion = $duracion,
        r.tipo_transporte = $tipo_transporte
    """
    tx.run(query, origen=origen, destino=destino,
           num_usuarios=num_usuarios, duracion=duracion, tipo_transporte=tipo_transporte)

# Insertar datos en Neo4j
with driver.session() as session:
    '''hoteles = df_merged["hotel_nombre"].unique()
    for hotel in hoteles:
        session.write_transaction(create_hotel_nodes, hotel)
    
    for _, row in df_merged.iterrows():
        print(f"Insertando fecha {row['fecha']} para hotel {row['hotel_nombre']}")
        session.write_transaction(create_date_nodes, row)
'''
    puntos = set(normalizar_nombre(p) for p in df_transporte["origen"]).union(
              set(normalizar_nombre(p) for p in df_transporte["destino"]))
    for punto in puntos:
        session.execute_write(create_punto_node, punto)

    # Insertar relaciones RUTA normalizadas
    for _, row in df_transporte.iterrows():
        origen = normalizar_nombre(row["origen"])
        destino = normalizar_nombre(row["destino"])
        num_usuarios = row.get("num_usuarios")
        duracion = row.get("duracion")
        tipo_transporte = row.get("tipo_transporte")

        session.execute_write(create_ruta_relationship, origen, destino, num_usuarios, duracion, tipo_transporte)


driver.close()
print("Importación completada con éxito.")