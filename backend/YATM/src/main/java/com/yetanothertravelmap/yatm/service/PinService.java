package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.dto.PinRequest;
import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class PinService {
    private final PinRepository pinRepository;
    private final UserRepository userRepository;
    private final MapRepository mapRepository;

    CategoryService categoryService;

    public PinService(PinRepository pinRepository, UserRepository userRepository, MapRepository mapRepository, CategoryService categoryService) {
        this.pinRepository = pinRepository;
        this.userRepository = userRepository;
        this.mapRepository = mapRepository;
        this.categoryService = categoryService;
    }

    public Optional<Set<Pin>> getPins(Long mapId) {
        return pinRepository.findByMap_MapId(mapId);
    }

    public boolean createPin(PinRequest pinRequest, Long mapId) {
       Optional<Map> mapOptional = mapRepository.findByMapId(mapId);
        if (mapOptional.isPresent()) {
            Pin newPin = new Pin();
            newPin.setName(pinRequest.getName());
            newPin.setLatitude(pinRequest.getLatitude());
            newPin.setLongitude(pinRequest.getLongitude());
            newPin.setDescription(pinRequest.getDescription());
            newPin.setMainCategory(pinRequest.getMainCategory());

            Map map = mapOptional.get();
            newPin.setMap(map);

            Set<Category> subCategories = new HashSet<>();
            for (String categoryName: pinRequest.getSubCategories()){
                Category newCategory = categoryService.findOrCreateByCategoryName(categoryName, map);
                subCategories.add(newCategory);
            }
            newPin.setCategories(subCategories);
            pinRepository.save(newPin);
            return true;
        }
        return false;
    }

    public boolean updatePin(PinRequest pinRequest) {
        Optional<Pin> pinOptional = pinRepository.findByPinId(pinRequest.getId());
        if (pinOptional.isPresent()) {
            Pin pin = pinOptional.get();
            pin.setName(pinRequest.getName());
            pin.setDescription(pinRequest.getDescription());
            pin.setMainCategory(pinRequest.getMainCategory());

            Set<Category> subCategories = new HashSet<>();
            for (String categoryName: pinRequest.getSubCategories()){
                Category newCategory = categoryService.findOrCreateByCategoryName(categoryName, pin.getMap());
                subCategories.add(newCategory);
            }
            pin.setCategories(subCategories);
            pinRepository.save(pin);
            return true;
        }
        return false;
    }

}
