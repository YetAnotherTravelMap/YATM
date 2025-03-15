package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.GeocodingRecord;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Component
public class GeocodingService {
    private final WebClient webClient;

    public GeocodingService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Flux<GeocodingRecord> getGeocodingResults(String searchString) {
        return webClient.get()
                .uri(builder -> builder.path("/search")
                    .queryParam("format", "json")
                    .queryParam("q", searchString)
                    .build())
                .header("Accept-Language", "en-CA")
                .retrieve().bodyToFlux(GeocodingRecord.class);
    }

    public Flux<GeocodingRecord> getReverseGeocodingResults(String lat, String lon) {
        return webClient.get()
                .uri(builder -> builder.path("/reverse")
                        .queryParam("format", "json")
                        .queryParam("lat", lat)
                        .queryParam("lon", lon)
                        .build())
                .header("Accept-Language", "en-CA")
                .retrieve().bodyToFlux(GeocodingRecord.class);
    }
}
