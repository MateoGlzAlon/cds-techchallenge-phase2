package com.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.Hotel;
import com.backend.repository.impl.HotelRepository;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public Hotel getHotelByName(String name) {
        return this.hotelRepository.findByName(name);
    }

/*************  ✨ Codeium Command ⭐  *************/
    /**

/******  bcc1ab1f-d69b-4582-8e12-325e1a75afa0  *******/
    public List<Hotel> getAllHotels() {
        return this.hotelRepository.findAll();
    }

}
