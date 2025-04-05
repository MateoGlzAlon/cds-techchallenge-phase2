package com.backend.persistence;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.annotation.Transient;
import com.backend.persistence.Punto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Node("Ruta")
public class Route {
    @Id
    @GeneratedValue
    private Long id;

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

    @Property("descripcion")
    private String description;

    @Relationship(type = "INICIO", direction = Relationship.Direction.INCOMING)
    @JsonManagedReference("punto-origin")
    private Punto origin;

}
