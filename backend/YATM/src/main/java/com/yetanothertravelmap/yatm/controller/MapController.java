package com.yetanothertravelmap.yatm.controller;

import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.service.MapService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
public class MapController {

    private final MapService mapService;

    public MapController(MapService mapService){
        this.mapService = mapService;
    }

    @GetMapping("/maps/{mapId}/pins")
    public Set<Pin> getPinsByMapId(@PathVariable Long mapId){
        return mapService.getPinsByMap(mapId);
    }
}
