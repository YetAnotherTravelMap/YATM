package com.yetanothertravelmap.yatm.records;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GeocodingRecord(int place_id, float lat, float lon, String name, String display_name) {
}
