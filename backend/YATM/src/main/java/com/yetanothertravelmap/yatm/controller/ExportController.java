package com.yetanothertravelmap.yatm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator;
import com.yetanothertravelmap.yatm.dto.json.FeatureCollection;
import com.yetanothertravelmap.yatm.dto.kml.Kml;
import com.yetanothertravelmap.yatm.dto.xml.XmlTravelMap;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.service.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final MapService mapService;
    private final PinService pinService;
    private final KmlService kmlService;
    private final XmlService xmlService;
    private final JsonService jsonService;

    public ExportController(MapService mapService, PinService pinService, KmlService kmlService, XmlService xmlService, JsonService jsonService) {
        this.mapService = mapService;
        this.pinService = pinService;
        this.kmlService = kmlService;
        this.xmlService = xmlService;
        this.jsonService = jsonService;
    }

    @GetMapping("/{mapId}/json")
    public ResponseEntity<FeatureCollection> getJsonFile(@PathVariable Long mapId, Principal principal) throws JsonProcessingException {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Set<Pin> pins = pinService.getPins(mapId).orElse(new HashSet<>());
        FeatureCollection jsonFeatureCollection = jsonService.getJsonFeatureCollectionFromPins(pins);
        return ResponseEntity.ok(jsonFeatureCollection);
    }

    @GetMapping("/{mapId}/kml")
    public ResponseEntity<ByteArrayResource> getKmlFile(@PathVariable Long mapId, Principal principal) throws JsonProcessingException {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Set<Pin> pins = pinService.getPins(mapId).orElse(new HashSet<>());
        Kml kml = kmlService.getKmlFromPins(pins);

        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.enable(ToXmlGenerator.Feature.WRITE_XML_DECLARATION);
        String xml = xmlMapper.writeValueAsString(kml);
        byte[] xmlBytes = xml.getBytes(StandardCharsets.UTF_8);

        ByteArrayResource resource = new ByteArrayResource(xmlBytes);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=export.kml")
                .contentType(MediaType.valueOf("application/vnd.google-earth.kml+xml; charset=utf-8"))
                .body(resource);
    }

    @GetMapping("/{mapId}/xml")
    public ResponseEntity<ByteArrayResource> getXmlFile(@PathVariable Long mapId, Principal principal) throws JsonProcessingException {
        if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Set<Pin> pins = pinService.getPins(mapId).orElse(new HashSet<>());
        XmlTravelMap xmlTravelMap = xmlService.getXmlTravelMapFromPins(pins);

        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.enable(ToXmlGenerator.Feature.WRITE_XML_DECLARATION);
        String xml = xmlMapper.writeValueAsString(xmlTravelMap);
        byte[] xmlBytes = xml.getBytes(StandardCharsets.UTF_8);

        ByteArrayResource resource = new ByteArrayResource(xmlBytes);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=export.xml")
                .contentType(MediaType.APPLICATION_XML)
                .body(resource);
    }

}
