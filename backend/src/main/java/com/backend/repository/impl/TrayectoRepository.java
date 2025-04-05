package com.backend.repository.impl;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Trayecto;

@Repository
public interface TrayectoRepository extends Neo4jRepository<Trayecto, Long> {
    @Query("MATCH path = (p1:Punto {nombre: $origin})-[t:TRAYECTO*1..5]->(p2:Punto {nombre: $destination}) RETURN t")

    List<Trayecto> findTrayectosBetweenCities(@Param("origen") String origen, @Param("destino") String destino);

}