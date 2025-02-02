package com.yetanothertravelmap.yatm.repository;

import com.yetanothertravelmap.yatm.model.Icon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface IconRepository extends JpaRepository<Icon, Long> {

    @Query("SELECT i FROM Icon i WHERE i.map.mapId = ?1 OR i.map IS NULL")
    Optional<Set<Icon>> findByMapIdIncludingNull(Long mapId);

    Optional<Icon> findByIdAndMap_MapId(Long id, Long mapId);
    Optional<Icon> findByImageAndMap_MapId(byte[] image, Long mapId);

}