package com.yetanothertravelmap.yatm.model;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PieChartCountryEntry {
    @JsonProperty("title")
    private String title;

    @JsonProperty("value")
    private int value;

    @JsonProperty("color")
    private String color;

    @JsonProperty("countryName")
    private String countryName;

    public PieChartCountryEntry(String title, int value, String color, String countryName){
        this.title = title;
        this.value = value;
        this.color = color;
        this.countryName = countryName;
    }

    public String getTitle(){
        return this.title;
    }

    public int getValue(){
        return this.value;
    }

    public String getColor(){
        return this.color;
    }

    public String getCountryName(){
        return this.countryName;
    }

    public void addOne(){
        this.value++;
    }

    public void setCountryName(String countryName){
        this.countryName = countryName;
    }
}
