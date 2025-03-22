package com.backend.repository.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Location;


@Repository
public interface LocationRepository extends Neo4jRepository<Location, UUID> {

    List<Location> findByName(String names);
}
