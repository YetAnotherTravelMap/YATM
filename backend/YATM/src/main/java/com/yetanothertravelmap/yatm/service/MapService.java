package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class MapService {
    PinService pinService;
    GeocodingService geocodingService;
    MapRepository mapRepository;

    public MapService(PinService pinService, GeocodingService geocodingService, MapRepository mapRepository) {
        this.geocodingService = geocodingService;
        this.pinService = pinService;
        this.mapRepository = mapRepository;
    }

    public boolean isUserAuthorizedForMap(Long mapId, String username) {
        Optional<Map> map = mapRepository.findById(mapId);
        if(map.isEmpty()){
            return false;
        }
        return map.get().getUser().getUsername().equals(username);
    }
}
