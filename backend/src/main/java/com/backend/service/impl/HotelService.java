package com.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.exception.CustomException;
import com.backend.persistence.Hotel;
import com.backend.persistence.HotelOccupancy;
import com.backend.persistence.Opinion;
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

    public Hotel getHotelById(Long hotelId) {

        Optional<Hotel> hotel = this.hotelRepository.findById(hotelId);
        
        if (!hotel.isPresent()) {
            throw new CustomException("Hotel not found");
        }
        return hotel.get();

    }

    public List<Hotel> getAllHotels() {
        return this.hotelRepository.findAll();
    }

    public Hotel getHotelInfoWithOccupancyByName(String nameHotel) {

        Optional<Hotel> hotelOpt = this.hotelRepository.findByName(nameHotel);

        if (!hotelOpt.isPresent()) {
            throw new CustomException("Hotel not found");
        }

        Hotel hotel = hotelOpt.get();

        List<HotelOccupancy> occupancies = hotelRepository.findOccupanciesByHotelName(nameHotel);

        hotel.setOccupancies(occupancies);

        return hotel;
    }

    public Hotel getHotelInfoWithComments(String nameHotel) {
        Optional<Hotel> hotelOpt = this.hotelRepository.findByName(nameHotel);

        if (!hotelOpt.isPresent()) {
            throw new CustomException("Hotel not found");
        }

        Hotel hotel = hotelOpt.get();

        List<Opinion> opinions = hotelRepository.findByOpinionsHotelNombre(nameHotel);
        System.out.println(opinions.toString());

        hotel.setOpinions(opinions);
        return hotel;

    }

    public Hotel getHotelInfoWithAllByName(String nameHotel) {
        Optional<Hotel> hotelOpt = this.hotelRepository.findByName(nameHotel);

        if (!hotelOpt.isPresent()) {
            throw new CustomException("Hotel not found");
        }

        Hotel hotel = hotelOpt.get();

        List<HotelOccupancy> occupancies = hotelRepository.findOccupanciesByHotelName(nameHotel);
        List<Opinion> opinions = hotelRepository.findByOpinionsHotelNombre(nameHotel);

        hotel.setOccupancies(occupancies);
        hotel.setOpinions(opinions);

        return hotel;
    }

}
