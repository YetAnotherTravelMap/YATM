package com.yetanothertravelmap.yatm.dto.json;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Icon {
    @JsonProperty("icon_name")
    private String iconName;

    @JsonProperty("icon_width")
    private int width;

    @JsonProperty("icon_height")
    private int height;

    @JsonProperty("icon_image")
    private String image; // Base64-encoded string

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
