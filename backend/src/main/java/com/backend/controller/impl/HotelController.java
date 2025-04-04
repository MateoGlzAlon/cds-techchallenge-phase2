package com.backend.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.persistence.Hotel;
import com.backend.service.impl.HotelService;

@RestController
@RequestMapping("api/v1/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    /**
     * * Get all hotels without occupancy
     * 
     * @return
     */
    @GetMapping("/all")
    public ResponseEntity<List<Hotel>> getAllHotels() {

        return ResponseEntity.ok(this.hotelService.getAllHotels());
    }

    /**
     * Get hotel by name without occupancy
     * 
     * @param nameHotel
     * @return
     */
    @GetMapping("/getHotelByName")
    public ResponseEntity<Hotel> getHotelByName(@RequestParam String nameHotel) {

        return ResponseEntity.ok(this.hotelService.getHotelByName(nameHotel));
    }

    /**
     * Get hotel by name with occupancy
     * 
     * @param nameHotel
     * @return
     */
    @GetMapping("/getHotelInfoWithOccupancyByName")
    public ResponseEntity<Hotel> getHotelInfoWithOccupancyByName(@RequestParam String nameHotel) {

        return ResponseEntity.ok(this.hotelService.getHotelInfoWithOccupancyByName(nameHotel));
    }

    /**
     * Get hotel by name with comments
     * 
     * @param nameHotel
     * @return
     */
    @GetMapping("/getHotelInfoWithComments")
    public ResponseEntity<Hotel> getHotelInfoWithComments(@RequestParam String nameHotel) {

        return ResponseEntity.ok(this.hotelService.getHotelInfoWithComments(nameHotel));
    }

    /**
     * Get hotel by name with occupancy and comments
     * 
     * @param nameHotel
     * @return
     */
    @GetMapping("/getHotelInfoWithAllByName")
    public ResponseEntity<Hotel> getHotelInfoWithOccupancyAndCommentsByName(@RequestParam String nameHotel) {

        return ResponseEntity.ok(this.hotelService.getHotelInfoWithAllByName(nameHotel));
    }

}
