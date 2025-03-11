from neo4j import GraphDatabase
import pandas as pd

# Configuración de conexión a Neo4j
URI = "bolt://neo4j:7687"
USER = "neo4j"
PASSWORD = "12345678"

# Cargar datos desde CSV
file_ocupacion = "ocupacion_hotelera.csv"
file_sostenibilidad = "datos_sostenibilidad.csv"

df_ocupacion = pd.read_csv(file_ocupacion)
df_sostenibilidad = pd.read_csv(file_sostenibilidad)

# Unir los datos por hotel y fecha
df_merged = pd.merge(df_ocupacion, df_sostenibilidad, on=["hotel_nombre", "fecha"], how="inner")

# Verificar si la fusión tiene datos
print(f"Filas en df_merged: {df_merged.shape[0]}")
if df_merged.empty:
    print("Error: No hay coincidencias entre los archivos. Verifica que las fechas y nombres de hotel coincidan exactamente.")
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

# Insertar datos en Neo4j
with driver.session() as session:
    hoteles = df_merged["hotel_nombre"].unique()
    for hotel in hoteles:
        session.write_transaction(create_hotel_nodes, hotel)
    
    for _, row in df_merged.iterrows():
        print(f"Insertando fecha {row['fecha']} para hotel {row['hotel_nombre']}")
        session.write_transaction(create_date_nodes, row)

driver.close()
print("Importación completada con éxito.")