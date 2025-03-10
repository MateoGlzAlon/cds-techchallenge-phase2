from neo4j import GraphDatabase
from config.settings import config

class Neo4jConnection:
    def __init__(self):
        self._driver = GraphDatabase.driver(
            config.NEO4J_URI, 
            auth=(config.NEO4J_USER, config.NEO4J_PASSWORD)
        )

    def query(self, query, parameters=None):
        with self._driver.session() as session:
            return session.run(query, parameters)

    def close(self):
        self._driver.close()

neo4j_conn = Neo4jConnection()
