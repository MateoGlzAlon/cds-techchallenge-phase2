package com.backend.repository.impl;

import java.util.UUID;
import java.util.List;


import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Hotel;

@Repository
public interface HotelRepository extends Neo4jRepository<Hotel, Long> {
    Hotel findByName(String name);
    List<Hotel> findAll();
}
