package com.backend.controller.impl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.controller.IDistanceController;
import com.backend.persistence.Trayecto;
import com.backend.service.impl.DistanceService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/v1/distance")
public class DistanceControllerImpl implements IDistanceController {

    @Autowired
    private DistanceService distanceCalculatorService;

    /**
     * TODO
     * Get all trayectories between two cities
     * 
     * @param origin
     * @param destination
     * @return
     */
    @Override
    @GetMapping("/getAllTrayectories")
    public ResponseEntity<List<Trayecto>> getAllTrayectories(@RequestParam String origin,
            @RequestParam String destination) {
        return ResponseEntity.ok(distanceCalculatorService.getAllTrayectories(origin, destination));
    }

}
