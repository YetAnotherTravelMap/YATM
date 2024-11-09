package com.yetanothertravelmap.yatm;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PinCategory {
    public PinCategory(Category category, Pin pin) {
        this.category = category;
        this.pin = pin;
    }

    @ManyToOne
    @JoinColumn(name = "pin_id", nullable = false)
    private Pin pin;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public PinCategory(){

    }

    public PinCategory(Pin pin, Category category){
        this.pin = pin;
        this.category = category;
    }

    public Pin getPin() {
        return pin;
    }

    public void setPin(Pin pin) {
        this.pin = pin;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
