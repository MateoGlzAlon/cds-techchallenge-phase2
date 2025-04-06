package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend.persistence.Trayecto;

public interface IDistanceController {

    public ResponseEntity<List<Trayecto>> getAllTrayectories(@RequestParam String origin,
            @RequestParam String destination);
}
