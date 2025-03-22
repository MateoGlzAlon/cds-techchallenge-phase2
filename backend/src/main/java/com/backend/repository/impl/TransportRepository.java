package com.backend.repository.impl;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Transport;


@Repository
public interface TransportRepository extends Neo4jRepository<Transport, UUID> {
    Transport findByDate(LocalDate date);
    Transport findByTransportType(String transportType);
    Transport findByUserCount(int userCount);
    Transport findByAverageTravelTime(int averageTravelTime);
    Transport findByOrigin(String origin);
    Transport findByDestination(String destination);
}
