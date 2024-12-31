package com.yetanothertravelmap.yatm.dto;

import com.yetanothertravelmap.yatm.enums.MainCategory;

import java.util.List;

public class PinCreationRequest {
    private String name;
    private Double latitude;
    private Double longitude;
    private String description;
    private MainCategory mainCategory;
    private List<String> subCategories;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MainCategory getMainCategory() {
        return mainCategory;
    }

    public void setMainCategory(String mainCategory) {
        this.mainCategory = MainCategory.valueOf(mainCategory.toUpperCase());
    }

    public List<String> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<String> subCategories) {
        this.subCategories = subCategories;
    }
}
