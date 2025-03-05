package com.yetanothertravelmap.yatm.dto;

import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.Pin;

import java.util.Set;

public class PinWithoutIconImage {

    private long pinId;

    private String name;

    private double latitude;

    private double longitude;

    private String country;

    private String countryCode;

    private String description;

    private String mainCategory;

    private Long iconId;

    private Set<Category> categories;

    public PinWithoutIconImage(){}

    public PinWithoutIconImage(Pin pin) {
        this.pinId = pin.getPinId();
        this.name = pin.getName();
        this.latitude = pin.getLatitude();
        this.longitude = pin.getLongitude();
        this.country = pin.getCountry();
        this.countryCode = pin.getCountryCode();
        this.description = pin.getDescription();
        this.mainCategory = pin.getMainCategory();
        this.categories = pin.getCategories();
        this.iconId = pin.getIcon().getId();
    }

    public long getPinId() {
        return pinId;
    }

    public void setPinId(long pinId) {
        this.pinId = pinId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMainCategory() {
        return mainCategory;
    }

    public void setMainCategory(String mainCategory) {
        this.mainCategory = mainCategory;
    }

    public Long getIconId() {
        return iconId;
    }

    public void setIconId(Long iconId) {
        this.iconId = iconId;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}
