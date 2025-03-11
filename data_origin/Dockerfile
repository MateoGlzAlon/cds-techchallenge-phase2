FROM python:3.9
WORKDIR /app
COPY ocupacion_hotelera.csv datos_sostenibilidad.csv import.py ./

RUN pip install --no-cache-dir --default-timeout=100 pandas neo4j

CMD ["python", "import.py"]
