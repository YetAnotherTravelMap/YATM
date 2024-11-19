package com.yetanothertravelmap.yatm.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GeocodingRecord(int place_id, float lat, float lon, String name, String display_name, List<String> boundingbox) {
}
