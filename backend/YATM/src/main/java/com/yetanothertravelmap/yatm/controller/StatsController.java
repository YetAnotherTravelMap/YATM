package com.yetanothertravelmap.yatm.controller;

import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.service.StatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService){
        this.statsService = statsService;
    }

    @PostMapping
    public ResponseEntity<?> getUserStats(@RequestBody User user){
        System.out.println("Username: " + user.getUsername());
        return ResponseEntity.ok(statsService.getStats(user));
    }
}
