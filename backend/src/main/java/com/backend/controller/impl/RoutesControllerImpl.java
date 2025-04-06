package com.backend.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.controller.IRoutesController;
import com.backend.persistence.Route;
import com.backend.service.impl.RoutesService;

@RestController
@RequestMapping("api/v1/routes")
public class RoutesControllerImpl implements IRoutesController {

    @Autowired
    private RoutesService routesService;

    /**
     * Get hotel by id
     *
     * @param
     * @return
     */
    @Override
    @GetMapping("/{routeId}")
    public ResponseEntity<Route> getHotelById(@PathVariable Long routeId) {
        return ResponseEntity.ok(this.routesService.getRouteById(routeId));
    }

    /**
     * Get all routes
     * 
     * @return
     */
    @Override
    @GetMapping("/all")
    public ResponseEntity<List<Route>> getAllRoutes() {
        return ResponseEntity.ok(routesService.getAllRoutes());
    }

}
