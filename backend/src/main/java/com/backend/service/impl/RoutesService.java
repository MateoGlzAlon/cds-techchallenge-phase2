package com.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.Route;
import com.backend.repository.impl.RouteRepository;

@Service
public class RoutesService {

    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route createRoute() {
        return routeRepository.save(new Route());
    }

}
