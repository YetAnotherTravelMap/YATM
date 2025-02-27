package com.yetanothertravelmap.yatm.dto.xml;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import java.util.List;

public class Pins {
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "Pin")
    private List<Pin> pinList;

    public List<Pin> getPinList() {
        return pinList;
    }

    public void setPinList(List<Pin> pinList) {
        this.pinList = pinList;
    }
}
