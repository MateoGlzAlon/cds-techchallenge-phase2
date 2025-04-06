package com.backend.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.Option;
import com.backend.repository.impl.TrayectoRepository;
import com.backend.repository.impl.LocationRepository;

@Service
public class DistanceService {

    @Autowired
    private LocationRepository locationRepository;

    public Map<String, Integer> calculateDistance(String locationOne, String locationTwo) {
        HashMap<String, Integer> result = new HashMap<>();
        result.put("Distance (km)", 0);
        result.put("Distance (miles)", 0);
        result.put("Est. Drive Time", 0);
        return result;
    }

    public Option getAllTrayectories(String origin, String destination) {
        Option opciones = locationRepository.findByNombreWithOptions(origin, destination);
        System.out.println("Opciones: " + opciones.toString());
        return opciones;

    }

}
