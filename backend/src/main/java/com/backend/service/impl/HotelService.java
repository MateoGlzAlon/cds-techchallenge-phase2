package com.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.exception.CustomException;
import com.backend.persistence.Hotel;
import com.backend.persistence.HotelWithOccupancyDTO;
import com.backend.repository.impl.HotelRepository;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public Hotel getHotelByName(String name) {

        Optional<Hotel> hotel = this.hotelRepository.findByName(name);

        if (!hotel.isPresent()) {
            throw new CustomException("Hotel not found");
        }
        return hotel.get();

    }


    public List<Hotel> getAllHotels() {
        return this.hotelRepository.findAll();
    }

    public HotelWithOccupancyDTO getHotelInfoWithOccupancyByName(String nameHotel) {

        Optional<Hotel> hotelOptional  = this.hotelRepository.findHotelWithOccupancies(nameHotel);

        if (!hotelOptional.isPresent()) {
            throw new CustomException("Hotel not found");
        }
    
        Hotel hotel = hotelOptional.get();
    
        // Crear el DTO y asignar los valores manualmente
        return new HotelWithOccupancyDTO(
            hotel.getId(),
            hotel.getName(),
            hotel.getAverageRating(),
            hotel.getNumberOfReviews(),
            hotel.getDescription(),
            hotel.getPricePerNight(),
            hotel.getLocation(),
            hotel.getOccupancies() // Aquí se incluyen las ocupaciones
        );
    }

}
