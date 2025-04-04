package com.backend.persistence;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

@RelationshipProperties
public class Trayecto {

    @Id
    @GeneratedValue
    private Long id;

    @TargetNode
    private Punto destino;

    @Property("num_usuarios")
    private int userCount;

    @Property("duracion")
    private int duration;

    @Property("tipo_transporte")
    private String transportType;
}