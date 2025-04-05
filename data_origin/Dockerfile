FROM python:3.9
WORKDIR /app
COPY ocupacion_hotelera.csv datos_sostenibilidad.csv csv_rutas.csv csv_transportes.csv import.py opiniones_turisticas.csv ./

RUN pip install --no-cache-dir --default-timeout=100 pandas neo4j tqdm

CMD ["python", "import.py"]
