package com.backend.persistence;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node("Transporte")
public class Transport {
    @Id
    @GeneratedValue
    private UUID id;

    @Property("fecha")
    private LocalDate date;

    @Property("tipo_transporte")
    private String transportType;

    @Property("num_usuarios")
    private int userCount;

    @Property("tiempo_viaje_promedio_min")
    private int averageTravelTime;

    @Relationship(type = "ORIGEN", direction = Relationship.Direction.OUTGOING)
    private Location origin;

    @Relationship(type = "DESTINO", direction = Relationship.Direction.OUTGOING)
    private Location destination;
}
