package com.backend.repository.impl;
import java.util.UUID;

import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Location;
import com.backend.persistence.Route;

@Repository
public interface TrayectoRepository extends Neo4jRepository<Route, UUID> { 
}
