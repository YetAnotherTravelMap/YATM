package com.yetanothertravelmap.yatm.dto.json;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Geometry {
    @JsonProperty("coordinates")
    private List<Double> coordinates; // [longitude, latitude]

    @JsonProperty("type")
    private String type = "Point";

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
