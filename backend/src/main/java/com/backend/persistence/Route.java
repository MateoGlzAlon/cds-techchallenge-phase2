package com.backend.persistence;

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

    @Relationship(type = "INICIO", direction = Relationship.Direction.INCOMING)
    private Punto origin;
    
    public Punto getOrigin() {
        return origin;
    }
    
    public void setOrigin(Punto origin) {
        this.origin = origin;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public String getRouteType() {
        return routeType;
    }

    public void setRouteType(String routeType) {
        this.routeType = routeType;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public int getDurationHours() {
        return durationHours;
    }

    public void setDurationHours(int durationHours) {
        this.durationHours = durationHours;
    }

    public int getPopularity() {
        return popularity;
    }

    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }
}
