package com.yetanothertravelmap.yatm.dto.xml;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import java.util.List;

// Categories.java
public class Categories {
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "category")
    private List<String> categoryList;

    public List<String> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<String> categoryList) {
        this.categoryList = categoryList;
    }
}
