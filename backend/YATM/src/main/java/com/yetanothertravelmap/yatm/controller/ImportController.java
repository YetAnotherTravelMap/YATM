package com.yetanothertravelmap.yatm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yetanothertravelmap.yatm.dto.JsonFile;
import com.yetanothertravelmap.yatm.dto.PinRequest;
import com.yetanothertravelmap.yatm.service.MapService;
import com.yetanothertravelmap.yatm.service.PinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/api/import")
public class ImportController {

    private final MapService mapService;
    private final PinService pinService;

    public ImportController(MapService mapService, PinService pinService) {
        this.mapService = mapService;
        this.pinService = pinService;
    }

    @PostMapping("/{mapId}")
    public ResponseEntity<String> uploadJsonFile(@RequestParam("jsonFile") MultipartFile jsonFile, @PathVariable Long mapId, Principal principal) {
        try {
            if (jsonFile.isEmpty()) {
                return ResponseEntity.badRequest().body("No file uploaded");
            }

            if (!jsonFile.getOriginalFilename().endsWith(".json")) {
                return ResponseEntity.badRequest().body("Please upload a valid JSON file");
            }

            if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            ObjectMapper objectMapper = new ObjectMapper();
            String content = new String(jsonFile.getBytes());
            JsonFile jsonFileWithPinRequests = objectMapper.readValue(content, JsonFile.class);

            for (PinRequest pinRequest : jsonFileWithPinRequests.getPinRequests()) {
                pinService.createPin(pinRequest, mapId);
            }

            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error processing the file");
        }
    }

}
