package com.yetanothertravelmap.yatm;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Pin {
    public Pin(String name, double latitude, double longitude, String description, Icon iconId) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.iconId = iconId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long pinId;

    @Column(nullable = false)
    private String name;

    @Column
    private double latitude;

    @Column
    private double longitude;

    @Column
    private String description;

    @OneToOne
    private Icon iconId;

    @OneToMany(mappedBy = "pin", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PinCategory> pinCategories = new HashSet<>();

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
        return iconId;
    }

    public void setIcon(Icon iconId) {
        this.iconId = iconId;
    }

    
}
