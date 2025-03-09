package com.yetanothertravelmap.yatm.dto.json;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Feature {
    @JsonProperty("geometry")
    private Geometry geometry;

    @JsonProperty("properties")
    private Properties properties;

    @JsonProperty("type")
    private String type = "Feature";

    public Geometry getGeometry() {
        return geometry;
    }

    public void setGeometry(Geometry geometry) {
        this.geometry = geometry;
    }

    public Properties getProperties() {
        return properties;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
