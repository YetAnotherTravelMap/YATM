package com.yetanothertravelmap.yatm.repository;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PinRepository extends JpaRepository<Pin, Long> {
    Optional<Set<Pin>> findByMap_MapId(Long mapId);
    Optional<Pin> findByPinId(Long pinId);

    @Modifying
    @Query("DELETE FROM Pin p WHERE p.map = :map")
    void deleteByMap(@Param("map") Map map);

    @Query("SELECT DISTINCT p FROM Pin p JOIN p.categories c WHERE p.map.mapId = :mapId AND c.name IN :categoryNames")
    Optional<Set<Pin>> findByMapIdAndCategoryNames(@Param("mapId") Long mapId, @Param("categoryNames") List<String> categoryNames);

}
