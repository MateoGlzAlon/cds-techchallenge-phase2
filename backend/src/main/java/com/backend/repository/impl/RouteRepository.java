package com.backend.repository.impl;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Route;

@Repository
public interface RouteRepository extends Neo4jRepository<Route, Long> {

    @Query("MATCH (p:Punto)-[:INICIO]->(r:Ruta) RETURN r, p")
    List<Route> findAllWithStartPoint();

}
