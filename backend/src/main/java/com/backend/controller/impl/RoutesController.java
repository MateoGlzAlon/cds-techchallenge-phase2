package com.backend.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.persistence.Route;
import com.backend.service.impl.RoutesService;

@RestController
@RequestMapping("api/v1/routes")
public class RoutesController {

    @Autowired
    private RoutesService routesService;

    @PostMapping("/add")
    public ResponseEntity<Route> createRoute() {
        return ResponseEntity.ok(routesService.createRoute());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Route>> getAllRoutes() {
        return ResponseEntity.ok(routesService.getAllRoutes());
    }

}
