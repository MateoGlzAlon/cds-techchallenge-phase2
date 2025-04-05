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

    @Relationship(type = "OPINA_SOBRE", direction = Relationship.Direction.INCOMING)
    @Transient
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

    // public Hotel() {}

    public Hotel(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<HotelOccupancy> getOccupancies() {
        return occupancies;
    }

    public void setOccupancies(List<HotelOccupancy> occupancies) {
        this.occupancies = occupancies;
    }

    public List<Opinion> getOpinions() {
        return opinions;
    }

    public void setOpinions(List<Opinion> opinions) {
        this.opinions = opinions;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(Integer numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(Double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
