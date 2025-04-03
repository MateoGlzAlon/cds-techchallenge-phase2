package com.backend.repository.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Hotel;

@Repository
public interface HotelRepository extends Neo4jRepository<Hotel, Long> {

    @Query("MATCH (h:Hotel {nombre: $name}) " +
    "OPTIONAL MATCH (h)-[:TIENE_OCUPACION]->(o:HotelOccupancy) " +
    "RETURN h, collect(o) as occupancies")
    Optional<Hotel> findHotelWithOccupancies(@Param("name") String name);

    Optional<Hotel> findByName(String name);

    List<Hotel> findAll();
}
