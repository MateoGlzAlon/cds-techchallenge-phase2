from neo4j import GraphDatabase
import pandas as pd
from tqdm import tqdm

# Configuración de conexión a Neo4j
URI = "bolt://localhost:7687"
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
ruta_descripciones = {
    "Aruba Central - 1.9": "Explora el corazón cultural de Aruba Central en una travesía de 19 horas repleta de historia local, arquitectura vibrante y encuentros con artesanos tradicionales. Ideal para quienes buscan una experiencia auténtica.",
    "Nimble Peak - 3.2": "Aventúrate en Nimble Peak durante 32 horas, disfrutando de vistas panorámicas y senderos emocionantes. Perfecto para los amantes de la naturaleza y la aventura.",
    "Composable Cloud - 6.1": "Sumérgete en la belleza de Composable Cloud durante 61 horas, explorando paisajes impresionantes y rutas desafiantes. Ideal para los aventureros que buscan un reto.",
    "Nimble Peak - 4.7": "Disfruta de una experiencia gastronómica única en Nimble Peak durante 47 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "Nimble Peak - 5.7": "Descubre la historia de Nimble Peak en un recorrido de 57 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "Ezmeral Valley - 5.2": "Explora la biodiversidad de Ezmeral Valley durante 52 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "Ezmeral Valley - 6.0": "Sumérgete en la rica historia de Ezmeral Valley durante 60 horas, explorando sitios históricos y aprendiendo sobre la cultura local.",
    "ProLiant Village - 6.9": "Descubre la cultura vibrante de ProLiant Village en un recorrido de 69 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Apollo Heights - 6.2": "Embárcate en una aventura épica en Apollo Heights durante 62 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Aruba Central - 7.2": "Disfruta de una experiencia gastronómica única en Aruba Central durante 72 horas, degustando delicias locales mientras exploras la belleza del área.",
    "ProLiant Village - 3.2": "Aventúrate en ProLiant Village durante 32 horas, disfrutando de vistas panorámicas y senderos emocionantes. Perfecto para los amantes de la naturaleza y la aventura.",
    "ProLiant Village - 1.0": "Disfruta de una experiencia gastronómica única en ProLiant Village durante 10 horas, degustando delicias locales mientras exploras la belleza del área.",
    "ProLiant Village - 16.6": "Descubre la cultura vibrante de ProLiant Village en un recorrido de 166 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Composable Cloud - 3.0": "Embárcate en una aventura épica en Composable Cloud durante 30 horas, explorando paisajes impresionantes y desafiantes rutas.",  
    "Composable Cloud - 1.1": "Explora la biodiversidad de Composable Cloud durante 11 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "Simplivity Springs - 8.4": "Sumérgete en la belleza de Simplivity Springs durante 84 horas, explorando paisajes impresionantes y rutas desafiantes. Ideal para los aventureros que buscan un reto.",
    "GreenLake Shores - 2.8": "Descubre la historia de GreenLake Shores en un recorrido de 28 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "Apollo Heights - 5.6": "Descubre la cultura vibrante de Apollo Heights en un recorrido de 56 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Simplivity Springs - 6.1": "Embárcate en una aventura épica en Simplivity Springs durante 61 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Alletra City - 6.5": "Descubre la cultura vibrante de Alletra City en un recorrido de 65 horas, donde cada paso revela tradiciones y costumbres locales.", 
    "Nimble Peak - 2.6": "Disfruta de una experiencia gastronómica única en Nimble Peak durante 26 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "Alletra City - 3.0": "Explora la biodiversidad de Alletra City durante 30 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "Alletra City - 2.1": "Descubre la historia de Alletra City en un recorrido de 21 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "HPE Innovation Hub - 0.4": "Explora la cultura de HPE Innovation Hub en un recorrido de 4 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Alletra City - 6.2": "Sumérgete en la rica historia de Alletra City durante 62 horas, explorando sitios históricos y aprendiendo sobre la cultura local.", 
    "Nimble Peak - 1.0": "Explora la biodiversidad de Nimble Peak durante 10 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "HPE Innovation Hub - 2.5": "Explora la cultura de HPE Innovation Hub en un recorrido de 25 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Aruba Central - 6.0": "Embárcate en una aventura épica en Aruba Central durante 60 horas, explorando paisajes impresionantes y desafiantes rutas.",        
    "ProLiant Village - 5.3": "Explora la biodiversidad de ProLiant Village durante 53 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "GreenLake Shores - 0.6": "Descubre la historia de GreenLake Shores en un recorrido de 6 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "HPE Innovation Hub - 1.7": "Disfruta de una experiencia gastronómica única en HPE Innovation Hub durante 17 horas, degustando delicias locales mientras exploras la belleza del área.",
    "Aruba Central - 1.7": "Embárcate en una aventura épica en Aruba Central durante 17 horas, explorando paisajes impresionantes y desafiantes rutas.",        
    "Ezmeral Valley - 7.5": "Descubre la cultura vibrante de Ezmeral Valley en un recorrido de 75 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Nimble Peak - 7.3": "Disfruta de una experiencia gastronómica única en Nimble Peak durante 73 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "ProLiant Village - 1.1": "Descubre la cultura vibrante de ProLiant Village en un recorrido de 11 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Alletra City - 7.3": "Descubre la cultura vibrante de Alletra City en un recorrido de 73 horas, donde cada paso revela tradiciones y costumbres locales.", 
    "HPE Innovation Hub - 3.9": "Explora la cultura de HPE Innovation Hub en un recorrido de 39 horas, donde cada paso revela tradiciones y costumbres locales.",
    "HPE Innovation Hub - 8.9": "Explora la biodiversidad de HPE Innovation Hub durante 89 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "Ezmeral Valley - 1.0": "Descubre la historia de Ezmeral Valley en un recorrido de 10 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "Simplivity Springs - 4.6": "Disfruta de una experiencia gastronómica única en Simplivity Springs durante 46 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "Alletra City - 2.0": "Embárcate en una aventura épica en Alletra City durante 20 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "GreenLake Shores - 11.4": "Descubre la historia de GreenLake Shores en un recorrido de 114 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "HPE Innovation Hub - 4.0": "Descubre la historia de HPE Innovation Hub en un recorrido de 40 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "GreenLake Shores - 4.8": "Disfruta de una experiencia gastronómica única en GreenLake Shores durante 48 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "Ezmeral Valley - 12.6": "Embárcate en una aventura épica en Ezmeral Valley durante 126 horas, explorando paisajes impresionantes y desafiantes rutas.",    
    "Apollo Heights - 3.9": "Descubre la historia de Apollo Heights en un recorrido de 39 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "HPE Innovation Hub - 2.4": "Descubre la historia de HPE Innovation Hub en un recorrido de 24 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "Nimble Peak - 1.5": "Embárcate en una aventura épica en Nimble Peak durante 15 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Aruba Central - 14.8": "Embárcate en una aventura épica en Aruba Central durante 148 horas, explorando paisajes impresionantes y desafiantes rutas.",      
    "Apollo Heights - 4.2": "Explora la biodiversidad de Apollo Heights durante 42 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
}


df_rutas["descripcion"] = df_rutas["ruta_nombre"].map(ruta_descripciones)

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
df_final["average_rating"] = df_final["average_rating"].fillna(0)
df_final["number_of_reviews"] = df_final["number_of_reviews"].fillna(0)

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
        popularidad: $popularidad,
        descripcion: $descripcion
    })
    """
    tx.run(query,
           ruta_nombre=row["ruta_nombre"],
           tipo_ruta=row["tipo_ruta"],
           longitud_km=row["longitud_km"],
           duracion_hr=row["duracion_hr"],
           popularidad=row["popularidad"],
           descripcion=row["descripcion"])
    
def link_punto_to_ruta(tx, punto_nombre, ruta_nombre):
    query = """
    MATCH (r:Ruta {ruta_nombre: $ruta_nombre})
    MERGE (p:Punto {nombre: $punto_nombre})
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
    for _, row in tqdm(df_final.iterrows(), total=len(df_final), desc="Cargando hoteles en Neo4j"):
        session.write_transaction(create_hotel_properties, row)
    
    for _, row in tqdm(df_ocupacion.iterrows(), total=len(df_ocupacion), desc="Cargando ocupación en Neo4j"):
        session.write_transaction(create_hotel_occupancy, row)

    for _, row in tqdm(df_merged.iterrows(), total=len(df_merged), desc="Actualizando sostenibilidad en Neo4j"):
        session.write_transaction(update_sustainability, row)

    puntos = set(normalizar_nombre(p) for p in df_transporte["origen"]).union(
              set(normalizar_nombre(p) for p in df_transporte["destino"]))
    for punto in tqdm(puntos, desc="Creando puntos en Neo4j"):
        session.execute_write(create_punto_node, punto)

    for _, row in tqdm(df_transporte.iterrows(), total=len(df_transporte), desc="Creando trayectos en Neo4j"):
        origen = normalizar_nombre(row["origen"])
        destino = normalizar_nombre(row["destino"])
        num_usuarios = row.get("num_usuarios")
        duracion = row.get("tiempo_viaje_promedio_min")
        tipo_transporte = row.get("tipo_transporte")
        session.execute_write(create_trayecto_relationship, origen, destino, num_usuarios, duracion, tipo_transporte)

    for _, row in tqdm(df_rutas.iterrows(), total=len(df_rutas), desc="Creando rutas en Neo4j"):
        session.execute_write(create_ruta_node, row)

    for _, row in tqdm(df_rutas.iterrows(), total=len(df_rutas), desc="Vinculando puntos a rutas en Neo4j"):
        origen = normalizar_nombre(row["origen_ruta"])
        ruta_nombre = row["ruta_nombre"]
        session.execute_write(link_punto_to_ruta, origen, ruta_nombre)
    
    for _, row in tqdm(df_opiniones.iterrows(), total=len(df_opiniones), desc="Cargando opiniones en Neo4j"):
        session.execute_write(create_opinion_node, row)

driver.close()
print("Datos de hoteles y ocupación actualizados en Neo4j.")