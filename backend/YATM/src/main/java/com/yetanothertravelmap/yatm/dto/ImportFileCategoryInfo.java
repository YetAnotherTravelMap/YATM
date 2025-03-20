package com.yetanothertravelmap.yatm.dto;

import java.util.HashMap;

public class ImportFileCategoryInfo {
    private int importedMainCategoryCount;
    private HashMap<String, Integer> categoryCounts;

    public ImportFileCategoryInfo() {}

    public ImportFileCategoryInfo(int importedMainCategoryCount, HashMap<String, Integer> categoryCounts) {
        this.importedMainCategoryCount = importedMainCategoryCount;
        this.categoryCounts = categoryCounts;
    }

    public int getImportedMainCategoryCount() {
        return importedMainCategoryCount;
    }

    public void setImportedMainCategoryCount(int importedMainCategoryCount) {
        this.importedMainCategoryCount = importedMainCategoryCount;
    }

    public HashMap<String, Integer> getCategoryCounts() {
        return categoryCounts;
    }

    public void setCategoryCounts(HashMap<String, Integer> categoryCounts) {
        this.categoryCounts = categoryCounts;
    }
}
