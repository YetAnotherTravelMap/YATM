package com.yetanothertravelmap.yatm.repository;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface PinRepository extends JpaRepository<Pin, Long> {
    Optional<Set<Pin>> findByMap_MapId(Long mapId);
    Optional<Pin> findByPinId(Long pinId);
}
