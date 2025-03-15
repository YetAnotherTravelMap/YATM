package com.yetanothertravelmap.yatm.enums;

public enum MainCategory {
    BEEN("Been"),
    FAVOURITE("Favourite"),
    WANT2GO("Want2Go"),
    IMPORTED("Imported");

    public final String name;

    private MainCategory(String name) {
        this.name = name;
    }

    public static boolean isValidCategory(String value) {
        for (MainCategory category : MainCategory.values()) {
            if (category.name.equalsIgnoreCase(value)) {
                return true;
            }
        }
        return false;
    }
}
