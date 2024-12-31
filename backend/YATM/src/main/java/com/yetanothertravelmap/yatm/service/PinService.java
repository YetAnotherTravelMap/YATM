package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.dto.PinCreationRequest;
import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class PinService {
    PinRepository pinRepository;
    UserRepository userRepository;
    MapRepository mapRepository;

    public PinService(PinRepository pinRepository, UserRepository userRepository, MapRepository mapRepository) {
        this.pinRepository = pinRepository;
        this.userRepository = userRepository;
        this.mapRepository = mapRepository;
    }

    public Optional<Set<Pin>> getPins(Long mapId) {
        return pinRepository.findByMap_MapId(mapId);
    }

    public void createPin(PinCreationRequest pinRequest, Long mapId) {
        Pin newPin = new Pin();
        newPin.setName(pinRequest.getName());
        newPin.setLatitude(pinRequest.getLatitude());
        newPin.setLongitude(pinRequest.getLongitude());
        newPin.setDescription(pinRequest.getDescription());

        Optional<Map> mapOptional = mapRepository.findByMapId(mapId);
        if (mapOptional.isPresent()) {
            Map map = mapOptional.get();
            newPin.setMap(map);
            pinRepository.save(newPin);
        }
    }
}
