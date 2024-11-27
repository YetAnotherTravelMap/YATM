package com.yetanothertravelmap.yatm.repository;

import com.yetanothertravelmap.yatm.model.Map;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MapRepository extends JpaRepository<Map, Long> {
    Optional<Map> findByMapId(Long mapId);
    Optional<Map> findByUserIdAndTitle(Long userId, String title);
}
