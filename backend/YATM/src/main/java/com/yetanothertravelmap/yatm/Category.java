package com.yetanothertravelmap.yatm;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Category {
    public Category(String name, Map map){
        this.name = name;
        this.map = map;
    }

    public Category(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "map_id", nullable = false)
    private Map map;

    @ManyToMany
    private Set<PinCategory> pinCategories;


}