package com.yetanothertravelmap.yatm.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.yetanothertravelmap.yatm.dto.ImportFileCategoryInfo;
import com.yetanothertravelmap.yatm.dto.PinRequest;
import com.yetanothertravelmap.yatm.dto.json.FeatureCollection;
import com.yetanothertravelmap.yatm.dto.kml.Kml;
import com.yetanothertravelmap.yatm.dto.xml.XmlTravelMap;
import com.yetanothertravelmap.yatm.enums.MainCategory;
import com.yetanothertravelmap.yatm.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/import")
public class ImportController {

    private final MapService mapService;
    private final PinService pinService;
    private final KmlService kmlService;
    private final XmlService xmlService;
    private final JsonService jsonService;

    public ImportController(MapService mapService, PinService pinService, KmlService kmlService, XmlService xmlService, JsonService jsonService) {
        this.mapService = mapService;
        this.pinService = pinService;
        this.kmlService = kmlService;
        this.xmlService = xmlService;
        this.jsonService = jsonService;
    }

    @PostMapping("/{mapId}")
    public ResponseEntity<String> importPinFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("subcategoryMappings") String subcategoryMappings,
            @RequestParam("importedMainCategoryMapping") String importedMainCategoryMapping,
            @PathVariable Long mapId,
            Principal principal) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("No file uploaded");
            }

            List<String> acceptedFileTypes = Arrays.asList("json", "geojson", "kml", "xml");

            String filename = file.getOriginalFilename();
            int startIndexOfExtension = filename != null ? filename.lastIndexOf(".") : -1;
            String fileType = startIndexOfExtension != -1? filename.substring(startIndexOfExtension + 1).toLowerCase(): null;
            if (fileType == null || !acceptedFileTypes.contains(fileType)) {
                return ResponseEntity.badRequest().body("Please upload a valid file type. Accepted file types are: " + String.join(", ", acceptedFileTypes));
            }

            if (!mapService.isUserAuthorizedForMap(mapId, principal.getName())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            List<PinRequest> pinRequests = List.of();
            if (fileType.equals("json") || fileType.equals("geojson")) {
                ObjectMapper objectMapper = new ObjectMapper();
                String content = new String(file.getBytes());
                FeatureCollection jsonFeatureCollection = objectMapper.readValue(content, FeatureCollection.class);
                pinRequests = jsonService.getPinRequestsFromJsonFeatureCollection(jsonFeatureCollection);
            }else if(fileType.equals("kml")) {
                XmlMapper xmlMapper = new XmlMapper();
                Kml kml = xmlMapper.readValue(file.getInputStream(), Kml.class);
                pinRequests = kmlService.getPinRequestsFromKml(kml);
            }else if(fileType.equals("xml")) {
                XmlMapper xmlMapper = new XmlMapper();
                XmlTravelMap xml = xmlMapper.readValue(file.getInputStream(), XmlTravelMap.class);
                pinRequests = xmlService.getPinRequestsFromXmlTravelMap(xml);
            }

            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> subcategoryMappingsParsed = objectMapper.readValue(subcategoryMappings, new TypeReference<Map<String, String>>() {});
            for (PinRequest pinRequest : pinRequests) {
                List<String> updatedSubCategories = pinRequest.getSubCategories().stream()
                        .map(subcategory -> subcategoryMappingsParsed.getOrDefault(subcategory, subcategory)) // Replace if found in map, else keep original
                        .collect(Collectors.toList());
                pinRequest.setSubCategories(updatedSubCategories); // Update the pinRequest object
                if (pinRequest.getMainCategory() == MainCategory.IMPORTED){
                    pinRequest.setMainCategory(importedMainCategoryMapping);
                }
            }

            boolean isSuccessful = pinService.createMultiplePins(pinRequests, mapId);
            if(!isSuccessful){
                return ResponseEntity.status(500).body("Error processing the file for the required map.");
            }

            return ResponseEntity.ok("File uploaded successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error processing the file.");
        }
    }

    @PostMapping("/getImportFileCategoryInfo")
    public ResponseEntity<?> getImportFileCategoryInfo(@RequestParam("file") MultipartFile file, Principal principal) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("No file uploaded");
            }

            List<String> acceptedFileTypes = Arrays.asList("json", "geojson", "kml", "xml");

            String filename = file.getOriginalFilename();
            int startIndexOfExtension = filename != null ? filename.lastIndexOf(".") : -1;
            String fileType = startIndexOfExtension != -1? filename.substring(startIndexOfExtension + 1).toLowerCase(): null;
            if (fileType == null || !acceptedFileTypes.contains(fileType)) {
                return ResponseEntity.badRequest().body("Please upload a valid file type. Accepted file types are: " + String.join(", ", acceptedFileTypes));
            }

            List<PinRequest> pinRequests = List.of();
            if (fileType.equals("json") || fileType.equals("geojson")) {
                ObjectMapper objectMapper = new ObjectMapper();
                String content = new String(file.getBytes());
                FeatureCollection jsonFeatureCollection = objectMapper.readValue(content, FeatureCollection.class);
                pinRequests = jsonService.getPinRequestsFromJsonFeatureCollection(jsonFeatureCollection, false);
            }else if(fileType.equals("kml")) {
                XmlMapper xmlMapper = new XmlMapper();
                Kml kml = xmlMapper.readValue(file.getInputStream(), Kml.class);
                pinRequests = kmlService.getPinRequestsFromKml(kml, false);
            }else if(fileType.equals("xml")) {
                XmlMapper xmlMapper = new XmlMapper();
                XmlTravelMap xml = xmlMapper.readValue(file.getInputStream(), XmlTravelMap.class);
                pinRequests = xmlService.getPinRequestsFromXmlTravelMap(xml, false);
            }

            HashMap<String, Integer> categoryCounts = new HashMap<>();
            int importedMainCategoryCount = 0;

            for (PinRequest pinRequest : pinRequests) {
                List<String> subCategories = pinRequest.getSubCategories();
                for (String subCategory : subCategories) {
                    categoryCounts.put(subCategory, categoryCounts.getOrDefault(subCategory, 0) + 1);
                }
                if (pinRequest.getMainCategory() == MainCategory.IMPORTED){
                    importedMainCategoryCount++;
                }
            }

            ImportFileCategoryInfo importFileCategoryInfo = new ImportFileCategoryInfo(importedMainCategoryCount, categoryCounts);

            return ResponseEntity.ok(importFileCategoryInfo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error processing the file.");
        }
    }

}
