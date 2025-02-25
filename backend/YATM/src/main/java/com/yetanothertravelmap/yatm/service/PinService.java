package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.dto.PinRequest;
import com.yetanothertravelmap.yatm.model.*;
import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.repository.IconRepository;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class PinService {
    private final PinRepository pinRepository;
    private final MapRepository mapRepository;
    private final IconRepository iconRepository;
    private final IconService iconService;

    CategoryService categoryService;

    public PinService(PinRepository pinRepository, MapRepository mapRepository, IconRepository iconRepository, CategoryService categoryService, IconService iconService) {
        this.pinRepository = pinRepository;
        this.mapRepository = mapRepository;
        this.iconRepository = iconRepository;
        this.categoryService = categoryService;
        this.iconService = iconService;
    }

    public Optional<Set<Pin>> getPins(Long mapId) {
        return pinRepository.findByMap_MapId(mapId);
    }

    public boolean createPin(PinRequest pinRequest, Long mapId) {
        Optional<Map> mapOptional = mapRepository.findByMapId(mapId);
        if (mapOptional.isEmpty()) {
            return false;
        }

        Pin newPin = createPinFromPinRequest(pinRequest, mapOptional.get());
        pinRepository.save(newPin);
        return true;
    }

    public boolean createMultiplePins(List<PinRequest> pinRequests, Long mapId) {
        Optional<Map> mapOptional = mapRepository.findByMapId(mapId);
        if (mapOptional.isEmpty()) {
            return false;
        }

        List<Pin> newPins = new ArrayList<>();
        for (PinRequest pinRequest : pinRequests) {
            Pin newPin = createPinFromPinRequest(pinRequest, mapOptional.get());
            newPins.add(newPin);
        }
        pinRepository.saveAll(newPins);
        return true;
    }

    public boolean updatePin(PinRequest pinRequest) {
        Optional<Pin> pinOptional = pinRepository.findByPinId(pinRequest.getId());
        if (pinOptional.isPresent()) {
            Pin pin = pinOptional.get();
            pin.setName(pinRequest.getName());
            pin.setDescription(pinRequest.getDescription());
            pin.setMainCategory(pinRequest.getMainCategory());

            Set<Category> subCategories = new HashSet<>();
            for (String categoryName : pinRequest.getSubCategories()) {
                Category newCategory = categoryService.findOrCreateByCategoryName(categoryName, pin.getMap());
                subCategories.add(newCategory);
            }
            pin.setCategories(subCategories);
            pin.setIcon(getOrCreateNewIcon(pinRequest, pin.getMap()));

            pinRepository.save(pin);
            categoryService.deleteUnusedCategories();
            return true;
        }
        return false;
    }

    public boolean deletePin(Long mapId, Long pinId) {
        Optional<Pin> pin = pinRepository.findByPinId(pinId);
        if (pin.isPresent() && pin.get().getMap().getMapId() == mapId) {
            pinRepository.deleteById(pinId);
            categoryService.deleteUnusedCategories();
            return true;
        } else {
            return false;
        }
    }

    private Pin createPinFromPinRequest(PinRequest pinRequest, Map map) {
        Pin newPin = new Pin();
        newPin.setName(pinRequest.getName());
        newPin.setLatitude(pinRequest.getLatitude());
        newPin.setLongitude(pinRequest.getLongitude());
        newPin.setCountryCode(pinRequest.getCountryCode());
        newPin.setDescription(pinRequest.getDescription());
        newPin.setMainCategory(pinRequest.getMainCategory());
        newPin.setMap(map);

        Set<Category> subCategories = new HashSet<>();
        if(pinRequest.getSubCategories() != null) {
            for (String categoryName : pinRequest.getSubCategories()) {
                Category newCategory = categoryService.findOrCreateByCategoryName(categoryName, map);
                subCategories.add(newCategory);
            }
        }
        newPin.setCategories(subCategories);
        newPin.setIcon(getOrCreateNewIcon(pinRequest, map));

        return newPin;
    }

    private Icon getOrCreateNewIcon(PinRequest pinRequest, Map map) {
        if (pinRequest.getIconId() != null && pinRequest.getIconId() > 0) { // Existing pin
            Optional<Icon> iconOptional = iconService.getIcon(pinRequest.getIconId(), map.getMapId());
            if (iconOptional.isPresent()) {
                return iconOptional.get();
            }
        }

        byte[] iconBytes = null;
        try {
            iconBytes = (pinRequest.getIconImageBytes() != null && pinRequest.getIconImageBytes().length > 0)
                    ? pinRequest.getIconImageBytes()
                    : (pinRequest.getIconImage() != null ? pinRequest.getIconImage().getBytes() : null);
        } catch (IOException e) {
            System.out.println("Cannot get icon bytes from image file!");
            e.printStackTrace();
        }

        if (iconBytes != null && iconBytes.length > 0) {
            Optional<Icon> iconOptional = iconRepository.findByImageAndMap_MapId(iconBytes, map.getMapId());
            if (iconOptional.isPresent()) { // Importing Existing Pin Icon
                return iconOptional.get();
            }else {
                Icon newIcon = new Icon();
                newIcon.setImage(iconBytes);
                newIcon.setIconName(pinRequest.getIconName());
                newIcon.setWidth(pinRequest.getIconWidth());
                newIcon.setHeight(pinRequest.getIconHeight());
                newIcon.setMap(map);
                iconRepository.save(newIcon);
                return newIcon;
            }
        }

        // If we are still not able to get/create an icon, return the first predefined icon
        Optional<Icon> iconOptional = iconService.getIcon(1L, map.getMapId());
        return iconOptional.orElse(null);
    }

}
