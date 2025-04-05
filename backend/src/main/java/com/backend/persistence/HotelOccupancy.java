package com.backend.persistence;

import java.util.UUID;

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
    private UUID id;

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

    public HotelOccupancy() {
    }

    public HotelOccupancy(UUID id, String date, double occupancyRate, int confirmedBookings, int cancellations,
                          double averagePricePerNight, int energyConsumption, int wasteGenerated,
                          double recyclingRate, int waterUsage, Hotel hotel) {
        this.id = id;
        this.date = date;
        this.occupancyRate = occupancyRate;
        this.confirmedBookings = confirmedBookings;
        this.cancellations = cancellations;
        this.averagePricePerNight = averagePricePerNight;
        this.energyConsumption = energyConsumption;
        this.wasteGenerated = wasteGenerated;
        this.recyclingRate = recyclingRate;
        this.waterUsage = waterUsage;
        this.hotel = hotel;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getOccupancyRate() {
        return occupancyRate;
    }

    public void setOccupancyRate(double occupancyRate) {
        this.occupancyRate = occupancyRate;
    }

    public int getConfirmedBookings() {
        return confirmedBookings;
    }

    public void setConfirmedBookings(int confirmedBookings) {
        this.confirmedBookings = confirmedBookings;
    }

    public int getCancellations() {
        return cancellations;
    }

    public void setCancellations(int cancellations) {
        this.cancellations = cancellations;
    }

    public double getAveragePricePerNight() {
        return averagePricePerNight;
    }

    public void setAveragePricePerNight(double averagePricePerNight) {
        this.averagePricePerNight = averagePricePerNight;
    }

    public int getEnergyConsumption() {
        return energyConsumption;
    }

    public void setEnergyConsumption(int energyConsumption) {
        this.energyConsumption = energyConsumption;
    }

    public int getWasteGenerated() {
        return wasteGenerated;
    }

    public void setWasteGenerated(int wasteGenerated) {
        this.wasteGenerated = wasteGenerated;
    }

    public double getRecyclingRate() {
        return recyclingRate;
    }

    public void setRecyclingRate(double recyclingRate) {
        this.recyclingRate = recyclingRate;
    }

    public int getWaterUsage() {
        return waterUsage;
    }

    public void setWaterUsage(int waterUsage) {
        this.waterUsage = waterUsage;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
}
