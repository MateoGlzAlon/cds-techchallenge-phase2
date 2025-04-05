package com.backend.persistence;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
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
@Node("Fecha")
public class HotelOccupancy {

    @Id
    @GeneratedValue
    private Long id;

    @Property("fecha")
    private String date;

    @Property("tasa_ocupacion")
    private double occupancyRate;

    @Property("reservas")
    private int confirmedBookings;

    @Property("cancelaciones")
    private int cancellations;

    @Property("precio_promedio")
    private double averagePricePerNight;

    @Property("consumo_energia_kwh")
    private int energyConsumption;

    @Property("residuos_generados_kg")
    private int wasteGenerated;

    @Property("porcentaje_reciclaje")
    private double recyclingRate;

    @Property("uso_agua_m3")
    private int waterUsage;

    @Relationship(type = "TIENE_OCUPACION", direction = Relationship.Direction.INCOMING)
    private Hotel hotel;


}
