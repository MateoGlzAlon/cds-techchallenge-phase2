package com.backend.repository.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Punto;

@Repository
public interface LocationRepository extends Neo4jRepository<Punto, Long> {
    @Query("MATCH (p:Punto) WHERE p.nombre = $nombre RETURN p")
    Optional<Punto> findByName(@Param("nombre") String nombre);
}
