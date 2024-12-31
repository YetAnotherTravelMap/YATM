package com.yetanothertravelmap.yatm.model;

import jakarta.persistence.*;

@Entity
public class Icon {
    public Icon(String iconName, byte[] image) {
        this.iconName = iconName;
        this.image = image;
    }

    public Icon(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String iconName;

    @Column
    private byte[] image;

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
