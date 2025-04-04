package com.backend.controller.impl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.persistence.Trayecto;
import com.backend.service.impl.DistanceCalculatorService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/v1/distance")
public class DistanceController {

    @Autowired
    private DistanceCalculatorService distanceCalculatorService;

    // @GetMapping("/calculate")
    // public ResponseEntity<Map<String, Integer>> getMethodName(@RequestParam String locationOne,
    //         @RequestParam String locationTwo) {
    //     return ResponseEntity.ok(distanceCalculatorService.calculateDistance(locationOne, locationTwo));
    // }

    /**
     * TODO
     * Get all trayectories between two cities
     * 
     * @param origin
     * @param destination
     * @return
     */
    @GetMapping("/getAllTrayectories")
    public ResponseEntity<List<Trayecto>> getAllTrayectories(@RequestParam String origin,
            @RequestParam String destination) {
        return ResponseEntity.ok(distanceCalculatorService.getAllTrayectories(origin, destination));
    }

}
