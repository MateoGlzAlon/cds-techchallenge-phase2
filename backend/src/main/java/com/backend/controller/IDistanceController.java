package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend.persistence.Option;

public interface IDistanceController {

    public ResponseEntity<Option> getAllTrayectories(@RequestParam String origin,
            @RequestParam String destination);
}
