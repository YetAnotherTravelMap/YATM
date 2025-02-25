package com.yetanothertravelmap.yatm.dto.kml;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class Placemark {
    @JacksonXmlProperty(localName = "name")
    private String name;

    @JacksonXmlProperty(localName = "ExtendedData")
    private ExtendedData extendedData;

    @JacksonXmlProperty(localName = "Point")
    private Point point;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ExtendedData getExtendedData() {
        return extendedData;
    }

    public void setExtendedData(ExtendedData extendedData) {
        this.extendedData = extendedData;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }
}