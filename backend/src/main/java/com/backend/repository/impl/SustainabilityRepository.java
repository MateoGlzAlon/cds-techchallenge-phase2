package com.backend.repository.impl;

import java.util.UUID;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.HotelOccupancy;
import com.backend.persistence.Sustainability;

@Repository
public interface SustainabilityRepository extends Neo4jRepository<Sustainability, UUID> {
    Sustainability findByEnergyConsumption(int energyConsumption);

    Sustainability findByWasteGenerated(int wasteGenerated);

    Sustainability findByRecyclingRate(double recyclingRate);

    Sustainability findByWaterUsage(int waterUsage);

    Sustainability findByOccupancy(HotelOccupancy occupancy);

    Sustainability findByEnergyConsumptionAndWasteGeneratedAndRecyclingRateAndWaterUsageAndOccupancy(
            int energyConsumption, int wasteGenerated, double recyclingRate, int waterUsage, HotelOccupancy occupancy);
}
