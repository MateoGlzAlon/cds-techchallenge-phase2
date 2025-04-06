package com.backend.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.controller.IHotelController;
import com.backend.persistence.Hotel;
import com.backend.service.impl.HotelService;

@RestController
@RequestMapping("api/v1/hotels")
public class HotelControllerImpl implements IHotelController {

    @Autowired
    private HotelService hotelService;

    /**
     * * Get all hotels without occupancy
     * 
     * @return
     */
    @Override
    @GetMapping("/all")
    public ResponseEntity<List<Hotel>> getAllHotels() {

        return ResponseEntity.ok(this.hotelService.getAllHotels());
    }


    /**
     * Get hotel by id
     *
     * @param hotelId
     * @return
     */
    @Override
    @GetMapping("/{hotelId}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long hotelId) {
        return ResponseEntity.ok(this.hotelService.getHotelById(hotelId));
    }


}
