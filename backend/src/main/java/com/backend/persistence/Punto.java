package com.backend.persistence;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;
import com.backend.persistence.Route;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Node("Punto")
public class Punto {
    @Id
    @GeneratedValue
    private Long id;

    @Property("nombre")
    private String name;

    @Relationship(type = "INICIO", direction = Relationship.Direction.OUTGOING)
    @JsonBackReference("punto-origin")
    private Route ruta;
}
