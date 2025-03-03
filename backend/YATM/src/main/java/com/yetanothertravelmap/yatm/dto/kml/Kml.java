package com.yetanothertravelmap.yatm.dto.kml;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

@JsonIgnoreProperties(ignoreUnknown = true)
@JacksonXmlRootElement(localName = "kml")
public class Kml {
    @JacksonXmlProperty(isAttribute = true, localName = "xmlns")
    private String xmlns = "http://www.opengis.net/kml/2.2";

    @JacksonXmlProperty(localName = "Document")
    private Document document;

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }
}
