package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class PinService {
    PinRepository pinRepository;

    public PinService(PinRepository pinRepository){
        this.pinRepository = pinRepository;
    }

    public Optional<Set<Pin>> getPins(Long mapId){
        return pinRepository.findByMap_MapId(mapId);
    }
}
