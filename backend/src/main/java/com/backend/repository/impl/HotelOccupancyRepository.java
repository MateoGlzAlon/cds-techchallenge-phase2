package com.backend.repository.impl;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.HotelOccupancy;

@Repository
public interface HotelOccupancyRepository extends Neo4jRepository<HotelOccupancy, UUID> {
    HotelOccupancy findByDate(LocalDate date);
    HotelOccupancy findByOccupancyRate(double occupancyRate);
    HotelOccupancy findByConfirmedBookings(int confirmedBookings);
    HotelOccupancy findByCancellations(int cancellations);
    HotelOccupancy findByAveragePricePerNight(double averagePricePerNight);


}
