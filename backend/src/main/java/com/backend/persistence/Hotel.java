package com.backend.persistence;

import java.util.List;

import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Node("Hotel")
public class Hotel {
    @Id
    @GeneratedValue
    private Long id;

    @Property("nombre")
    private String name;

    @Relationship(type = "TIENE_OCUPACION", direction = Relationship.Direction.OUTGOING)
    @Transient
    private List<HotelOccupancy> occupancies;

    @Property("valoracion_media")
    private Double averageRating;

    @Property("numero_resenas")
    private Integer numberOfReviews;

    @Property("descripcion")
    private String description;

    @Property("precio_noche")
    private Double pricePerNight;

    @Property("ubicacion")
    private String location;

    // public Hotel() {}

    public Hotel(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
