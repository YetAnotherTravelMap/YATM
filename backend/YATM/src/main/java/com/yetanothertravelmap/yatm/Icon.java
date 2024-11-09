package com.yetanothertravelmap.yatm;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Blob;

@Entity
public class Icon {
    public Icon(String iconName, Blob image) {
        this.iconName = iconName;
        this.image = image;
    }

    @Id
    @GeneratedValue
    private long id;

    @Column
    private String iconName;

    @Column
    private Blob image;

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
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
