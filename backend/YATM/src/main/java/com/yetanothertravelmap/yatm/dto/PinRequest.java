package com.yetanothertravelmap.yatm.dto;

import com.yetanothertravelmap.yatm.enums.MainCategory;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class PinRequest {
    private Long id;
    private String name;
    private Double latitude;
    private Double longitude;
    private String country;
    private String countryCode;
    private String description;
    private MainCategory mainCategory;
    private List<String> subCategories;
    private Long iconId;
    private String iconName;
    private MultipartFile iconImage;
    private byte[] iconImageBytes;
    private int iconWidth;
    private int iconHeight;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
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

    public void addSubCategories(List<String> subCategories) {
        this.subCategories.addAll(subCategories);
    }

    public Long getIconId() {
        return iconId;
    }

    public void setIconId(Long iconId) {
        this.iconId = iconId;
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public MultipartFile getIconImage() {
        return iconImage;
    }

    public void setIconImage(MultipartFile iconImage) {
        this.iconImage = iconImage;
    }

    public byte[] getIconImageBytes() {
        return iconImageBytes;
    }

    public void setIconImageBytes(byte[] iconImageBytes) {
        this.iconImageBytes = iconImageBytes;
    }

    public int getIconWidth() {
        return iconWidth;
    }

    public void setIconWidth(int iconWidth) {
        this.iconWidth = iconWidth;
    }

    public int getIconHeight() {
        return iconHeight;
    }

    public void setIconHeight(int iconHeight) {
        this.iconHeight = iconHeight;
    }
}
