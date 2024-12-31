package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category findOrCreateByCategoryName(String categoryName, Map map) {
        Optional<Category> optionalCategory = categoryRepository.findByNameAndMap_MapId(categoryName, map.getMapId());
        if (optionalCategory.isPresent()) {
            return optionalCategory.get();
        }

        Category category = new Category();
        category.setName(categoryName);
        category.setMap(map);
        categoryRepository.save(category);
        return category;
    }

}
