package com.backend.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.persistence.Hotel;
import com.backend.service.impl.HotelService;

@RestController
@RequestMapping("api/v1/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping("/all")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        System.out.println("Entró al endpoint /api/v1/hotels/all");
        return ResponseEntity.ok(this.hotelService.getAllHotels());
    }



}
