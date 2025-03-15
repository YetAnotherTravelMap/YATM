package com.yetanothertravelmap.yatm.repository;

import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.Map;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNameAndMap_MapId(String name, Long mapId);
    Optional<Category> findByIdAndMap_MapId(Long id, Long mapId);
    Optional<Set<Category>> findByMap_MapId(Long mapId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Category c WHERE c.pins IS EMPTY")
    void deleteUnusedCategories();
}
