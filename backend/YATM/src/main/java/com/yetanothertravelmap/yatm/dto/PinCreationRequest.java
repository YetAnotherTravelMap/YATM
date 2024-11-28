package com.yetanothertravelmap.yatm.dto;

import java.util.List;

public class PinCreationRequest {
    private String locationName;
    private List<Double> pos; // lat, long
    private String description;

    // Getters and Setters

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public List<Double> getPos() {
        return pos;
    }

    public void setPos(List<Double> pos) {
        this.pos = pos;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}


