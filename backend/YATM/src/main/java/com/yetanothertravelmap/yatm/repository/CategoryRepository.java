package com.yetanothertravelmap.yatm.repository;

import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.Map;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNameAndMap_MapId(String name, Long mapId);
    Optional<Set<Category>> findByMap_MapId(Long mapId);
}
