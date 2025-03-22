package com.backend.persistence;

import java.util.UUID;

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
@Node("Sostenibilidad")
public class Sustainability {
    @Id @GeneratedValue private UUID id;

    @Property("consumo_energia_kwh")
    private int energyConsumption;

    @Property("residuos_generados_kg")
    private int wasteGenerated;

    @Property("porcentaje_reciclaje")
    private double recyclingRate;

    @Property("uso_agua_m3")
    private int waterUsage;

    @Relationship(type = "TIENE_OCUPACION", direction = Relationship.Direction.INCOMING)
    private HotelOccupancy occupancy;
}
