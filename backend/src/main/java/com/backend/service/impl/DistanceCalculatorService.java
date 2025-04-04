package com.backend.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.persistence.Trayecto;
import com.backend.repository.impl.TrayectoRepository;

@Service
public class DistanceCalculatorService {

    @Autowired
    private TrayectoRepository trayectoRepository;

    public Map<String, Integer> calculateDistance(String locationOne, String locationTwo) {
        HashMap<String, Integer> result = new HashMap<>();
        result.put("Distance (km)", 0);
        result.put("Distance (miles)", 0);
        result.put("Est. Drive Time", 0);
        return result;
    }

    public List<Trayecto> getAllTrayectories(String origin, String destination) {
        List<Trayecto> trayectos = trayectoRepository.findTrayectosBetweenCities("Aruba Central", "Ezmeral Valley");

        if (trayectos.isEmpty()) {
            System.out.println("No hay trayectos entre " + origin + " y " + destination);
        } else {
            System.out.println("Trayectos: " + trayectos.toString());
        }
        return null;

    }

}
