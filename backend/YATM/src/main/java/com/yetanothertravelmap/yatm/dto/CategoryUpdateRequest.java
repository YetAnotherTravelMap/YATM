package com.yetanothertravelmap.yatm.dto;

public class CategoryUpdateRequest {
    private Long categoryId;
    private String categoryNewName;

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryNewName() {
        return categoryNewName;
    }

    public void setCategoryNewName(String categoryNewName) {
        this.categoryNewName = categoryNewName;
    }
}
