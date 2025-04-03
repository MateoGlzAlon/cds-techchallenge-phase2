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
file_opiniones = "opiniones_turisticas.csv"
file_sostenibilidad = "datos_sostenibilidad.csv"
file_rutas = "csv_rutas.csv"
file_transporte = "csv_transportes.csv"

df_ocupacion = pd.read_csv(file_ocupacion)
df_opiniones = pd.read_csv(file_opiniones)
df_sostenibilidad = pd.read_csv(file_sostenibilidad)
df_rutas = pd.read_csv(file_rutas, sep=";")
df_transporte = pd.read_csv(file_transporte, sep=";")

df_ocupacion.columns = df_ocupacion.columns.str.strip().str.lower()
df_opiniones.columns = df_opiniones.columns.str.strip().str.lower()
df_sostenibilidad.columns = df_sostenibilidad.columns.str.strip().str.lower()
df_rutas.columns = df_rutas.columns.str.strip().str.lower()
df_transporte.columns = df_transporte.columns.str.strip().str.lower()

# Asignación de ubicaciones
hotel_ubicaciones = {
    "Alletra Diamond Grand Hotel": "Alletra City",
    "ProLiant Towers": "ProLiant Village",
    "Aruba Luxury Lodge": "Aruba Central",
    "ProLiant Haven": "ProLiant Village",
    "Apollo Executive Beach Resort": "Apollo Heights",
    "Alletra Haven": "Alletra City",
    "GreenLake Platinum Heritage Inn": "GreenLake Shores",
    "ProLiant Place": "ProLiant Village",
    "Alletra Resort": "Alletra City",
    "GreenLake Digital Business Suites": "GreenLake Shores",
    "Apollo Resort & Spa": "Apollo Heights",
    "Nimble Inn": "Nimble Peak",
    "Ezmeral Grand Hotel": "Ezmeral Valley",
    "Alletra Boutique Hotel": "Alletra City",
    "Simplivity Golden Plaza Hotel": "Simplivity Springs",
    "Apollo Diamond Suites": "Apollo Heights",
    "Apollo Towers": "Apollo Heights",
    "Aruba Lodge": "Aruba Central",
    "InfoSight Boutique Hotel": "HPE Innovation Hub",
    "Primera Grand": "GreenLake Shores",
    "dHCI Executive Boutique Hotel": "Composable Cloud",
    "dHCI Platinum Beach Resort": "Composable Cloud",
    "Pointnext Signature Residences & Suites": "HPE Innovation Hub",
    "Synergy Golden Grand Hotel": "HPE Innovation Hub",
    "Cray Villas": "Ezmeral Valley"
}

# Calcular métricas por hotel
df_hoteles = df_ocupacion.groupby("hotel_nombre").agg({
    "precio_promedio_noche": "mean"
}).rename(columns={"precio_promedio_noche": "price_per_night"}).reset_index()

df_reviews = df_opiniones[df_opiniones["tipo_servicio"] == "Hotel"]
df_reviews = df_reviews.groupby("nombre_servicio").agg({
    "puntuacion": "mean",
    "comentario": "count"
}).rename(columns={"puntuacion": "average_rating", "comentario": "number_of_reviews"}).reset_index()

df_final = pd.merge(df_hoteles, df_reviews, left_on="hotel_nombre", right_on="nombre_servicio", how="left")
df_final["average_rating"].fillna(0, inplace=True)
df_final["number_of_reviews"].fillna(0, inplace=True)

def generate_description(hotel_name):
    return f"{hotel_name} es un destino ideal para viajeros que buscan comodidad y lujo. Sus instalaciones modernas y servicios de primera garantizan una estancia inolvidable."

df_final["description"] = df_final["hotel_nombre"].apply(generate_description)
df_final["location"] = df_final["hotel_nombre"].map(hotel_ubicaciones)

df_merged = pd.merge(df_ocupacion, df_sostenibilidad, on=["hotel_nombre", "fecha"], how="inner")

# Conectar a Neo4j
driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))

def create_hotel_properties(tx, row):
    query = """
    MERGE (h:Hotel {nombre: $hotel_nombre})
    SET h.valoracion_media = $average_rating,
        h.numero_resenas = $number_of_reviews,
        h.descripcion = $description,
        h.precio_noche = $price_per_night,
        h.ubicacion = $location
    """
    tx.run(query, hotel_nombre=row["hotel_nombre"], average_rating=row["average_rating"],
           number_of_reviews=int(row["number_of_reviews"]), description=row["description"],
           price_per_night=row["price_per_night"], location=row["location"])

def create_hotel_occupancy(tx, row):
    query = """
    MATCH (h:Hotel {nombre: $hotel_nombre})
    CREATE (o:HotelOccupancy {fecha: $fecha, tasa_ocupacion: $tasa_ocupacion, reservas: $reservas,
                              cancelaciones: $cancelaciones, precio_promedio: $precio})
    MERGE (h)-[:TIENE_OCUPACION]->(o)
    """
    tx.run(query, hotel_nombre=row["hotel_nombre"], fecha=row["fecha"],
           tasa_ocupacion=row["tasa_ocupacion"], reservas=row["reservas_confirmadas"],
           cancelaciones=row["cancelaciones"], precio=row["precio_promedio_noche"])

def update_sustainability(tx, row):
    query = """
    MATCH (h:Hotel {nombre: $hotel_nombre})-[:TIENE_OCUPACION]->(o:HotelOccupancy {fecha: $fecha})
    SET o.consumo_energia_kwh = $consumo_energia_kwh,
        o.residuos_generados_kg = $residuos_generados_kg,
        o.porcentaje_reciclaje = $porcentaje_reciclaje,
        o.uso_agua_m3 = $uso_agua_m3
    """
    tx.run(query,
           hotel_nombre=row["hotel_nombre"],
           fecha=row["fecha"],
           consumo_energia_kwh=row["consumo_energia_kwh"],
           residuos_generados_kg=row["residuos_generados_kg"],
           porcentaje_reciclaje=row["porcentaje_reciclaje"],
           uso_agua_m3=row["uso_agua_m3"])
    

def create_punto_node(tx, nombre):
    query = """
    MERGE (p:Punto {nombre: $nombre})
    """
    tx.run(query, nombre=nombre)

def create_trayecto_relationship(tx, origen, destino, num_usuarios=None, duracion=None, tipo_transporte=None):
    query = """
    MATCH (o:Punto {nombre: $origen})
    MATCH (d:Punto {nombre: $destino})
    MERGE (o)-[r:TRAYECTO]->(d)
    SET r.num_usuarios = $num_usuarios,
        r.duracion = $duracion,
        r.tipo_transporte = $tipo_transporte
    """
    tx.run(query, origen=origen, destino=destino,
           num_usuarios=num_usuarios, duracion=duracion, tipo_transporte=tipo_transporte)

def create_ruta_node(tx, row):
    query = """
    MERGE (r:Ruta {
        ruta_nombre: $ruta_nombre,
        tipo_ruta: $tipo_ruta,
        longitud_km: $longitud_km,
        duracion_hr: $duracion_hr,
        popularidad: $popularidad
    })
    """
    tx.run(query,
           ruta_nombre=row["ruta_nombre"],
           tipo_ruta=row["tipo_ruta"],
           longitud_km=row["longitud_km"],
           duracion_hr=row["duracion_hr"],
           popularidad=row["popularidad"])
    
def link_punto_to_ruta(tx, punto_nombre, ruta_nombre):
    query = """
    MERGE (p:Punto {nombre: $punto_nombre})
    OPTIONAL MATCH (r:Ruta {ruta_nombre: $ruta_nombre})
    WITH p, r
    WHERE r IS NOT NULL
    MERGE (p)-[:INICIO]->(r)
    """
    tx.run(query, punto_nombre=punto_nombre, ruta_nombre=ruta_nombre)

def create_opinion_node(tx, row):
    query = """
    CREATE (o:Opinion {
        comentario: $comentario,
        puntuacion: $puntuacion,
        tipo_servicio: $tipo_servicio
    })
    WITH o
    OPTIONAL MATCH (h:Hotel {nombre: $nombre_servicio})
    FOREACH (_ IN CASE WHEN h IS NOT NULL THEN [1] ELSE [] END |
        MERGE (o)-[:OPINA_SOBRE]->(h)
    )
    WITH o 
    OPTIONAL MATCH (r:Ruta {ruta_nombre: $nombre_servicio})
    FOREACH (_ IN CASE WHEN r IS NOT NULL THEN [1] ELSE [] END |
        MERGE (o)-[:OPINA_SOBRE]->(r)
    )
    """
    tx.run(query,
           comentario=row["comentario"],
           puntuacion=row["puntuacion"],
           fecha=row["fecha"],
           tipo_servicio=row["tipo_servicio"],
           nombre_servicio=row["nombre_servicio"])


# Insertar datos en Neo4j
with driver.session() as session:
    '''  for _, row in df_final.iterrows():
        session.write_transaction(create_hotel_properties, row)
    
    for _, row in df_ocupacion.iterrows():
        session.write_transaction(create_hotel_occupancy, row)

    for _, row in df_merged.iterrows():
        session.write_transaction(update_sustainability, row)

    puntos = set(normalizar_nombre(p) for p in df_transporte["origen"]).union(
              set(normalizar_nombre(p) for p in df_transporte["destino"]))
    for punto in puntos:
        session.execute_write(create_punto_node, punto)

    for _, row in df_transporte.iterrows():
        origen = normalizar_nombre(row["origen"])
        destino = normalizar_nombre(row["destino"])
        num_usuarios = row.get("num_usuarios")
        duracion = row.get("duracion")
        tipo_transporte = row.get("tipo_transporte")
        session.execute_write(create_trayecto_relationship, origen, destino, num_usuarios, duracion, tipo_transporte)

    for _, row in df_rutas.iterrows():
        session.execute_write(create_ruta_node, row)

    for _, row in df_rutas.iterrows():
        origen = normalizar_nombre(row["origen_ruta"])
        ruta_nombre = row["ruta_nombre"]
        session.execute_write(link_punto_to_ruta, origen, ruta_nombre)
    '''
    for _, row in df_opiniones.iterrows():
        session.write_transaction(create_opinion_node, row)

driver.close()
print("Datos de hoteles y ocupación actualizados en Neo4j.")