package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.backend.persistence.Route;

public interface IRoutesController {

    public ResponseEntity<Route> getHotelById(@PathVariable Long routeId);

    public ResponseEntity<List<Route>> getAllRoutes();
}
