package com.backend.controller.impl;

import java.util.List;

import com.backend.persistence.Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
     * Get hotel by id
     *
     * @param
     * @return
     */
    @GetMapping("/{routeId}")
    public ResponseEntity<Route> getHotelById(@PathVariable Long routeId) {
        return ResponseEntity.ok(this.routesService.getRouteById(routeId));
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
