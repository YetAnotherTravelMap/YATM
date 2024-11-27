package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Pin;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MapService {
    PinService pinService;
    GeocodingService geocodingService;

    public MapService(PinService pinService, GeocodingService geocodingService){
        this.geocodingService = geocodingService;
        this.pinService = pinService;
    }

    public Set<Pin> getPinsByMap(Long mapId){
        Set<Pin> pinsWithMap = pinService.getPins(mapId).get();
        Set<Pin> pinWithoutMap = new HashSet<>();

        for (Pin pin : pinsWithMap){
            pinWithoutMap.add(new Pin(pin.getName(), pin.getLatitude(), pin.getLongitude(), pin.getDescription(), pin.getIcon()));
        }

        return pinWithoutMap;
    }
}
