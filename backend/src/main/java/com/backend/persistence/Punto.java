package com.backend.persistence;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

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
}
