package com.yetanothertravelmap.yatm.controllers;

import com.yetanothertravelmap.yatm.records.GeocodingRecord;
import com.yetanothertravelmap.yatm.services.GeocodingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class GeocodingController {

    private final GeocodingService geocodingService;

    public GeocodingController(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    @GetMapping("/api/geocoding")
    public Flux<GeocodingRecord> geocoding(@RequestParam(value = "q", defaultValue = "") String searchString) {
        return geocodingService.getGeocodingResults(searchString);
    }

    @GetMapping("/api/reverseGeocoding")
    public Flux<GeocodingRecord> reverseGeocoding(@RequestParam(value = "lat", defaultValue = "0") String lat, @RequestParam(value = "lon", defaultValue = "0") String lon) {
        return geocodingService.getReverseGeocodingResults(lat, lon);
    }
}
