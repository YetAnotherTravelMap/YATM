package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Icon;
import com.yetanothertravelmap.yatm.repository.IconRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class IconService {

    private final IconRepository iconRepository;

    public IconService(IconRepository iconRepository) {
        this.iconRepository = iconRepository;
    }

    public Optional<Set<Icon>> getIcons(Long mapId) {
        return iconRepository.findByMapIdIncludingNull(mapId);
    }

    public Optional<Icon> getIcon(Long iconId, Long mapId) {
        return iconRepository.findByIdAndMap_MapId(iconId, mapId);
    }
}
