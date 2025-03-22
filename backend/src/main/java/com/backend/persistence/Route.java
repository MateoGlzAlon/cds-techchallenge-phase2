package com.backend.persistence;

import java.util.UUID;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node("Ruta")
public class Route {
    @Id
    @GeneratedValue
    private UUID id;

    @Property("ruta_nombre")
    private String routeName;

    @Property("tipo_ruta")
    private String routeType;

    @Property("longitud_km")
    private double distanceKm;

    @Property("duracion_hr")
    private int durationHours;

    @Property("popularidad")
    private int popularity;

    @Relationship(type = "ORIGEN", direction = Relationship.Direction.OUTGOING)
    private Location origin;
}
