package com.yetanothertravelmap.yatm.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GeocodingRecord(
        int place_id,
        String licence,
        String osm_type,
        long osm_id,
        float lat,
        float lon,
        String category,
        String type,
        int place_rank,
        double importance,
        String addresstype,
        String name,
        String display_name,
        Address address,
        List<String> boundingbox
) {
}


