package com.yetanothertravelmap.yatm.controller;

import com.yetanothertravelmap.yatm.dto.PinRequest;
import com.yetanothertravelmap.yatm.dto.PinWithoutIconImage;
import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.Icon;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.service.CategoryService;
import com.yetanothertravelmap.yatm.service.IconService;
import com.yetanothertravelmap.yatm.service.MapService;
import com.yetanothertravelmap.yatm.service.PinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/maps")
public class MapController {

    private final MapService mapService;
    private final PinService pinService;
    private final IconService iconService;
    private final CategoryService categoryService;

    public MapController(MapService mapService, PinService pinService, IconService iconService, CategoryService categoryService) {
        this.mapService = mapService;
        this.pinService = pinService;
        this.iconService = iconService;
        this.categoryService = categoryService;
    }

    @GetMapping("/{mapId}/categories")
    public ResponseEntity<Set<Category>> getCategoriesByMapId(@PathVariable Long mapId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Set<Category> categories = categoryService.getCategories(mapId).orElse(new HashSet<>());
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{mapId}/icons")
    public ResponseEntity<Set<Icon>> getIconsByMapId(@PathVariable Long mapId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Set<Icon> icons = iconService.getIcons(mapId).orElse(new HashSet<>());
        return ResponseEntity.ok(icons);
    }

    @GetMapping("/{mapId}/pins")
    public ResponseEntity<Set<PinWithoutIconImage>> getPinsByMapId(@PathVariable Long mapId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Set<PinWithoutIconImage> pinWithoutIconImages = pinService.getPins(mapId)
                .orElse(Collections.emptySet())
                .stream()
                .map(PinWithoutIconImage::new)
                .collect(Collectors.toSet());

        return ResponseEntity.ok(pinWithoutIconImages);
    }

    @PostMapping("/{mapId}/pins")
    public ResponseEntity<Pin> createPin(@ModelAttribute PinRequest pinRequest, @PathVariable Long mapId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Pin createdPin = pinService.createPin(pinRequest, mapId);
        if (createdPin != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPin);
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }}

    @PutMapping("/{mapId}/pins")
    public ResponseEntity<Pin> updatePin(@ModelAttribute PinRequest pinRequest, @PathVariable Long mapId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Pin updatedPin = pinService.updatePin(pinRequest);
        if (updatedPin != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedPin);
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{mapId}/pins/{pinId}")
    public ResponseEntity<Void> deletePin(@PathVariable Long mapId, @PathVariable Long pinId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        boolean isSuccessful = pinService.deletePin(mapId, pinId);
        if (isSuccessful) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
