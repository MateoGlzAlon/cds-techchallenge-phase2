package com.backend.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.persistence.Route;
import com.backend.service.impl.RoutesService;

@RestController
@RequestMapping("api/v1/routes")
public class RoutesController {

    @Autowired
    private RoutesService routesService;

    /**
     * * Create a new route 
     * @param route
     * @return
     */
    @PostMapping("/addRoute")
    public ResponseEntity<Route> createRoute(@RequestBody Route route) {
        return ResponseEntity.ok(routesService.createRoute(route));
    }

    /**
     * Get all routes
     * TODO: Falta que pille el punto de inicio
     * que me devuelve null
     * 
     * @return
     */
    @GetMapping("/all")
    public ResponseEntity<List<Route>> getAllRoutes() {
        return ResponseEntity.ok(routesService.getAllRoutes());
    }

}
