package com.yetanothertravelmap.yatm.dto.kml;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class Point {
    @JacksonXmlProperty(localName = "coordinates")
    private String coordinates;

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }
}