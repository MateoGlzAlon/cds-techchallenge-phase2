package com.backend.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node("Punto")
public class Location {
    @Id
    @GeneratedValue
    private UUID id;

    @Property("nombre")
    private String name;

    @Relationship(type = "RUTA", direction = Relationship.Direction.OUTGOING)
    private List<Route> routes;

}
