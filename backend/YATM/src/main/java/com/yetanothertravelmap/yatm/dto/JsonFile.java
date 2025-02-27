package com.yetanothertravelmap.yatm.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.yetanothertravelmap.yatm.config.JsonFileDeserializer;
import com.yetanothertravelmap.yatm.model.Pin;

import java.util.List;
import java.util.Set;

@JsonDeserialize(using = JsonFileDeserializer.class)
public class JsonFile {
    private Set<Pin> pins;
    private List<PinRequest> pinRequests;

    public JsonFile() {
    }

    public JsonFile(Set<Pin> pins) {
        this.pins = pins;
    }

    public JsonFile(List<PinRequest> pinRequests) {
        this.pinRequests = pinRequests;
    }

    public List<PinRequest> getPinRequests() {
        return pinRequests;
    }

    public void setPinRequests(List<PinRequest> pinRequests) {
        this.pinRequests = pinRequests;
    }

    public Set<Pin> getPins() {
        return pins;
    }

    public void setPins(Set<Pin> pins) {
        this.pins = pins;
    }
}
