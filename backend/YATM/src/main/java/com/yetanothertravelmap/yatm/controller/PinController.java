package com.yetanothertravelmap.yatm.controller;

import com.yetanothertravelmap.yatm.dto.PinCreationRequest;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.service.PinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pin")
public class PinController {

    private final PinService pinService;

    public PinController(PinService pinService) {
        this.pinService = pinService;
    }

    @PostMapping
    public ResponseEntity<Pin> createPin(@RequestBody PinCreationRequest pinRequestDTO) {
        double latitude = pinRequestDTO.getPos().get(0);
        double longitude = pinRequestDTO.getPos().get(1);

        Pin newPin = new Pin();
        newPin.setName(pinRequestDTO.getLocationName());
        newPin.setLatitude(latitude);
        newPin.setLongitude(longitude);
        newPin.setDescription(pinRequestDTO.getDescription());

        pinService.createPin(newPin);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
