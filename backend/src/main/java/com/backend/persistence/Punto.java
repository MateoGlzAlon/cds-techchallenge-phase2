package com.backend.persistence;

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
    private Route ruta;

    public String getName() {
        return this.name;
    }

    public void setName(String nombre) {
        this.name = nombre;
    }
}
