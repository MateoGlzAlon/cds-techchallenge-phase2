package com.backend.persistence;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelWithOccupancyDTO {
    private Long id;
    private String name;
    private Double averageRating;
    private Integer numberOfReviews;
    private String description;
    private Double pricePerNight;
    private String location;
    private List<HotelOccupancy> occupancies;
}
