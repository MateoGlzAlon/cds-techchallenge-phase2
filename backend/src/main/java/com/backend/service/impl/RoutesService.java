package com.backend.service.impl;

import java.util.List;
import java.util.Optional;

import com.backend.exception.CustomException;
import com.backend.persistence.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.Punto;
import com.backend.persistence.Route;
import com.backend.repository.impl.LocationRepository;
import com.backend.repository.impl.RouteRepository;

@Service
public class RoutesService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private LocationRepository locationRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route createRoute(Route route) {
        Punto origen = route.getOrigin();
        System.out.println("Origen: " + origen.toString());

        Optional<Punto> punto = location.findByName(origen.getName());

        if (punto.isPresent()) {
            origen = punto.get();
        } else {
            Punto nuevoPunto = new Punto();
            nuevoPunto.setName(origen.getName());
            nuevoPunto = locationRepository.save(nuevoPunto);
            origen = nuevoPunto;
        }

        route.setOrigin(origen);

        return routeRepository.save(route);
    }

    public Route getRouteById(Long routeId) {

        Optional<Route> route = this.routeRepository.findById(routeId);

        if (!route.isPresent()) {
            throw new CustomException("Route not found");
        }
        return route.get();

    }
}
