package com.yetanothertravelmap.yatm.model;

import jakarta.persistence.*;

@Entity
public class Map {
    public Map(String title, User user) {
        this.title = title;
        this.user = user;
    }

    public Map(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long mapId;

    @Column
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public long getMapId(){
        return mapId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
