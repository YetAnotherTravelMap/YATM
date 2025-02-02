package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.dto.PinRequest;
import com.yetanothertravelmap.yatm.model.*;
import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.repository.IconRepository;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PinService {
    private final PinRepository pinRepository;
    private final UserRepository userRepository;
    private final MapRepository mapRepository;
    private final IconRepository iconRepository;

    CategoryService categoryService;

    public PinService(PinRepository pinRepository, UserRepository userRepository, MapRepository mapRepository, IconRepository iconRepository, CategoryService categoryService) {
        this.pinRepository = pinRepository;
        this.userRepository = userRepository;
        this.mapRepository = mapRepository;
        this.iconRepository = iconRepository;
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
            newPin.setCountryCode(pinRequest.getCountryCode());
            newPin.setDescription(pinRequest.getDescription());
            newPin.setMainCategory(pinRequest.getMainCategory());

            Map map = mapOptional.get();
            newPin.setMap(map);

            Set<Category> subCategories = new HashSet<>();
            for (String categoryName : pinRequest.getSubCategories()) {
                Category newCategory = categoryService.findOrCreateByCategoryName(categoryName, map);
                subCategories.add(newCategory);
            }
            newPin.setCategories(subCategories);

            if (pinRequest.getIconImageBytes() != null && pinRequest.getIconImageBytes().length > 0) { // Imported Pin
                Optional<Icon> iconOptional = iconRepository.findByImageAndMap_MapId(pinRequest.getIconImageBytes(), mapId);
                if (iconOptional.isPresent()) { // Importing Existing Pin Icon
                    newPin.setIcon(iconOptional.get());
                }
            }

            if (pinRequest.getIconId() != null && pinRequest.getIconId() > 0) { // Existing pin
                Optional<Icon> iconOptional = iconRepository.findById(pinRequest.getIconId());
                if (iconOptional.isPresent()) {
                    newPin.setIcon(iconOptional.get());
                }
            } else { // New Pin
                try {
                    Icon newIcon = new Icon();
                    byte[] iconBytes = (pinRequest.getIconImageBytes() != null && pinRequest.getIconImageBytes().length > 0) ? pinRequest.getIconImageBytes() : pinRequest.getIconImage().getBytes();
                    newIcon.setImage(iconBytes);
                    newIcon.setIconName(pinRequest.getIconName());
                    newIcon.setWidth(pinRequest.getIconWidth());
                    newIcon.setHeight(pinRequest.getIconHeight());
                    iconRepository.save(newIcon);
                    newPin.setIcon(newIcon);
                } catch (Exception e) {
                    System.out.println("Cannot get the bytes of new pin's uploaded new icon! " + e.getMessage());
                    newPin.setIcon(null);
                    return false;
                }
            }


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
            for (String categoryName : pinRequest.getSubCategories()) {
                Category newCategory = categoryService.findOrCreateByCategoryName(categoryName, pin.getMap());
                subCategories.add(newCategory);
            }
            pin.setCategories(subCategories);

            if (pinRequest.getIconId() > 0) { // Existing pin
                Optional<Icon> iconOptional = iconRepository.findById(pinRequest.getIconId());
                if (iconOptional.isPresent()) {
                    pin.setIcon(iconOptional.get());
                }
            } else { // New Pin
                try {
                    Icon newIcon = new Icon();
                    newIcon.setImage(pinRequest.getIconImage().getBytes());
                    newIcon.setIconName(pinRequest.getIconName());
                    newIcon.setWidth(pinRequest.getIconWidth());
                    newIcon.setHeight(pinRequest.getIconHeight());
                    iconRepository.save(newIcon);
                    pin.setIcon(newIcon);
                } catch (Exception e) {
                    System.out.println("Cannot get the bytes of new pin's uploaded new icon! " + e.getMessage());
                    pin.setIcon(null);
                    return false;
                }
            }

            pinRepository.save(pin);
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

}
