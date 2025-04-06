package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.backend.persistence.Hotel;

public interface IHotelController {

    public ResponseEntity<List<Hotel>> getAllHotels();

    public ResponseEntity<Hotel> getHotelById(@PathVariable Long hotelId);

}