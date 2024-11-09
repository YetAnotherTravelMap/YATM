package com.yetanothertravelmap.yatm;

import jakarta.persistence.*;

@Entity
public class Map {
    public Map(String title, long userId) {
        this.title = title;
        this.userId = userId;
    }

    @Id
    @GeneratedValue
    private long mapId;

    @Column
    private String title;

    @ManyToOne
    private long userId;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
