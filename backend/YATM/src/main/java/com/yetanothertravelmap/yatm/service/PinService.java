package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
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

    public Optional<Set<Pin>> getPins(Long mapId){
        return pinRepository.findByMap_MapId(mapId);
    }

    public void createPin(Pin newPin) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();

        Optional<User> optionalUser = userRepository.findByUsername(principal.getName());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            ArrayList<Long> mapIds = new ArrayList<>(user.getMapIds());
            Collections.sort(mapIds);
            Optional<Map> mapOptional = mapRepository.findByMapId(mapIds.getFirst());

            if(mapOptional.isPresent()){
                Map map = mapOptional.get();
                newPin.setMap(map);
                pinRepository.save(newPin);
            }
        }
    }
}
