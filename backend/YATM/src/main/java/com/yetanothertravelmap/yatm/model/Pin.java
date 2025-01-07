package com.yetanothertravelmap.yatm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yetanothertravelmap.yatm.enums.MainCategory;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Pin {
    public Pin(String name, double latitude, double longitude, String description, Icon icon) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.icon = icon;
    }

    public Pin(String name, double latitude, double longitude, String description) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
    }

    public Pin(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pinId;

    @Column(nullable = false)
    private String name;

    @Column
    private double latitude;

    @Column
    private double longitude;

    @Column
    private String description;

    @Column
    private String mainCategory;

    @ManyToOne
    @JoinColumn(name = "icon_id")
    private Icon icon;

    @ManyToOne
    @JoinColumn(name = "map_id", nullable = false)
    @JsonIgnore
    private Map map;

    @ManyToMany
    @JoinTable(
            name = "Pin_Category",
            joinColumns = @JoinColumn(name = "pin_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    public Set<Category> categories;

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Map getMap() {
        return map;
    }

    public void setMap(Map map) {
        this.map = map;
    }

    public long getPinId() {
        return pinId;
    }

    public void setPinId(long id) {
        this.pinId = id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Icon getIcon() {
        return icon;
    }

    public void setIcon(Icon icon) {
        this.icon = icon;
    }

    public String getMainCategory() {
        return mainCategory;
    }

    public void setMainCategory(String mainCategory) {
        this.mainCategory = mainCategory;
    }

    public void setMainCategory(MainCategory mainCategory) {
        this.mainCategory = mainCategory.name;
    }

    
}
