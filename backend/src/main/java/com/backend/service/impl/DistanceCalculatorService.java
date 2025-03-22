package com.backend.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class DistanceCalculatorService {

    public Map<String, Integer> calculateDistance(String locationOne, String locationTwo) {
        HashMap<String, Integer> result = new HashMap<>();
        result.put("Distance (km)", 0);
        result.put("Distance (miles)", 0);
        result.put("Est. Drive Time", 0);
        return result;
    }
    
}
