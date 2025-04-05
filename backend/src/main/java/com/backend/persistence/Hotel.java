package com.backend.persistence;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference("hotel-ocuppancies")
    private List<HotelOccupancy> occupancies;

    @Relationship(type = "OPINA_SOBRE", direction = Relationship.Direction.INCOMING)
    private List<Opinion> opinions;

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

}
