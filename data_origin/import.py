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

df_ocupacion = pd.read_csv(file_ocupacion)
df_opiniones = pd.read_csv(file_opiniones)
df_sostenibilidad = pd.read_csv(file_sostenibilidad)

df_ocupacion.columns = df_ocupacion.columns.str.strip().str.lower()
df_opiniones.columns = df_opiniones.columns.str.strip().str.lower()
df_sostenibilidad.columns = df_sostenibilidad.columns.str.strip().str.lower()

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

# Convertir fechas al formato correcto
df_ocupacion["fecha"] = pd.to_datetime(df_ocupacion["fecha"]).dt.strftime("%Y-%m-%d")
df_merged["fecha"] = pd.to_datetime(df_merged["fecha"]).dt.strftime("%Y-%m-%d")

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
    MERGE (h:Hotel {nombre: $hotel_nombre})
    MERGE (o:HotelOccupancy {fecha: $fecha, hotel_nombre: $hotel_nombre})
    ON CREATE SET o.tasa_ocupacion = $tasa_ocupacion,
                  o.reservas = $reservas,
                  o.cancelaciones = $cancelaciones,
                  o.precio_promedio = $precio
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

# Insertar datos en Neo4j con barra de progreso
with driver.session() as session:
    print("Insertando propiedades de hoteles...")
    for _, row in tqdm(df_final.iterrows(), total=len(df_final)):
        session.execute_write(create_hotel_properties, row)
    
    print("Insertando datos de ocupación...")
    for _, row in tqdm(df_ocupacion.iterrows(), total=len(df_ocupacion)):
        session.execute_write(create_hotel_occupancy, row)

    print("Actualizando sostenibilidad...")
    for _, row in tqdm(df_merged.iterrows(), total=len(df_merged)):
        session.execute_write(update_sustainability, row)

driver.close()
print("Datos de hoteles y ocupación actualizados en Neo4j.")
