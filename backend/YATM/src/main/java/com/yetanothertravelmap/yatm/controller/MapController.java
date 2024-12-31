package com.yetanothertravelmap.yatm.controller;

import com.yetanothertravelmap.yatm.dto.PinCreationRequest;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.service.MapService;
import com.yetanothertravelmap.yatm.service.PinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/maps")
public class MapController {

    private final MapService mapService;
    private final PinService pinService;

    public MapController(MapService mapService, PinService pinService) {
        this.mapService = mapService;
        this.pinService = pinService;
    }

    @GetMapping("/{mapId}/pins")
    public ResponseEntity<Set<Pin>> getPinsByMapId(@PathVariable Long mapId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
//        Set<Pin> pins = pinService.getPins(mapId).orElse(new HashSet<>());
        Set<Pin> pins = mapService.getPinsByMap(mapId);
        return ResponseEntity.ok(pins);
    }

    @PostMapping("/{mapId}/pins")
    public ResponseEntity<Pin> createPin(@RequestBody PinCreationRequest pinRequest, @PathVariable Long mapId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        pinService.createPin(pinRequest, mapId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
