package com.yetanothertravelmap.yatm.dto.json;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class FeatureCollection {
    @JsonProperty("features")
    private List<Feature> features;

    @JsonProperty("type")
    private String type = "FeatureCollection";

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
