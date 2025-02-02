package com.yetanothertravelmap.yatm.controller;

import com.yetanothertravelmap.yatm.dto.JsonFile;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.service.MapService;
import com.yetanothertravelmap.yatm.service.PinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final MapService mapService;
    private final PinService pinService;

    public ExportController(MapService mapService, PinService pinService) {
        this.mapService = mapService;
        this.pinService = pinService;
    }

    @GetMapping("/{mapId}/json")
    public ResponseEntity<JsonFile> getJsonFile(@PathVariable Long mapId, Principal principal) {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Set<Pin> pins = pinService.getPins(mapId).orElse(new HashSet<>());
        JsonFile json = new JsonFile(pins);
        return ResponseEntity.ok(json);
    }

}
