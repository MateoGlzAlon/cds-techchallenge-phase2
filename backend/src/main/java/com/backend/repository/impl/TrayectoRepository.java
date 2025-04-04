package com.backend.repository.impl;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Trayecto;

@Repository
public interface TrayectoRepository extends Neo4jRepository<Trayecto, Long> {
    @Query("MATCH (p1:Punto)-[t:TRAYECTO]-(p2:Punto) " +
            "WHERE toLower(p1.nombre) = toLower($origen) " +
            "AND toLower(p2.nombre) = toLower($destino) " +
            "RETURN t ORDER BY t.duracion ASC")
    List<Trayecto> findTrayectosBetweenCities(@Param("origen") String origen, @Param("destino") String destino);

}