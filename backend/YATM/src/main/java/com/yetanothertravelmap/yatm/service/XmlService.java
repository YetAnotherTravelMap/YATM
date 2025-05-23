package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.dto.PinRequest;
import com.yetanothertravelmap.yatm.dto.xml.*;
import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.GeocodingRecord;
import com.yetanothertravelmap.yatm.model.Pin;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class XmlService {

    private final GeocodingService geocodingService;

    public XmlService(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    public XmlTravelMap getXmlTravelMapFromPins(Set<Pin> pins) {
        XmlTravelMap xmlTravelMap = new XmlTravelMap();
        xmlTravelMap.setName("Travel Map");
        xmlTravelMap.setDescription("generated by YATM (Yet Another Travel Map) on " + new Date());

        List<com.yetanothertravelmap.yatm.dto.xml.Pin> xmlPins = pins.stream()
                .map(this::toXmlPin)
                .collect(Collectors.toList());
        Pins pinsWrapper = new Pins();
        pinsWrapper.setPinList(xmlPins);
        xmlTravelMap.setPins(pinsWrapper);

        return xmlTravelMap;
    }


    public List<PinRequest> getPinRequestsFromXmlTravelMap(XmlTravelMap xmlTravelMap) {
        List<PinRequest> pinRequests = new ArrayList<>();
        for (com.yetanothertravelmap.yatm.dto.xml.Pin xmlPin : xmlTravelMap.getPins().getPinList()) {
            PinRequest pinRequest = new PinRequest();
            pinRequest.setName(xmlPin.getName());
            pinRequest.setMainCategory(xmlPin.getMainCategory());
            pinRequest.setDescription(xmlPin.getDescription());
            pinRequest.setCountry(xmlPin.getCountry());
            pinRequest.setCountryCode(xmlPin.getCountryCode());

            // Categories
            List<String> categories = xmlPin.getCategories().getCategoryList();
            pinRequest.setSubCategories(categories);

            // Icon
            Icon icon = xmlPin.getIcon();
            pinRequest.setIconName(icon.getName());
            pinRequest.setIconWidth(icon.getWidth());
            pinRequest.setIconHeight(icon.getHeight());
            pinRequest.setIconImageBytes(Base64.getDecoder().decode(icon.getImage().strip()));

            // Coordinates
            Coordinates coordinates = xmlPin.getCoordinates();
            pinRequest.setLongitude(coordinates.getLongitude());
            pinRequest.setLatitude(coordinates.getLatitude());

            // Use default values for null attributes
            if (pinRequest.getIconName() == null || pinRequest.getIconImageBytes() == null ||
                    pinRequest.getIconHeight() == 0 || pinRequest.getIconWidth() == 0) {
                pinRequest.setIconId(1L);
            }
            if(pinRequest.getMainCategory() == null){
                pinRequest.setMainCategory("Imported");
            }
            if(pinRequest.getCountryCode() == null || pinRequest.getCountry() == null){
                GeocodingRecord geocodingRecord = geocodingService.getReverseGeocodingResults(pinRequest.getLatitude().toString(), pinRequest.getLongitude().toString()).blockFirst();
                if(geocodingRecord != null) {
                    pinRequest.setCountry(geocodingRecord.address().country());
                    pinRequest.setCountryCode(geocodingRecord.address().country_code());
                }
            }

            pinRequests.add(pinRequest);
        }
        return pinRequests;
    }


    private com.yetanothertravelmap.yatm.dto.xml.Pin toXmlPin(Pin pin) {
        com.yetanothertravelmap.yatm.dto.xml.Pin xmlPin = new com.yetanothertravelmap.yatm.dto.xml.Pin();
        xmlPin.setName(pin.getName());
        xmlPin.setMainCategory(pin.getMainCategory());
        xmlPin.setDescription(pin.getDescription());
        xmlPin.setCountry(pin.getCountry());
        xmlPin.setCountryCode(pin.getCountryCode());

        // Categories
        Categories categories = new Categories();
        List<String> categoryNames = pin.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toList());
        categories.setCategoryList(categoryNames);
        xmlPin.setCategories(categories);

        // Icon
        Icon icon = new Icon();
        icon.setName(pin.getIcon().getIconName());
        icon.setWidth(pin.getIcon().getWidth());
        icon.setHeight(pin.getIcon().getHeight());
        icon.setImage(Base64.getEncoder().encodeToString(pin.getIcon().getImage()));
        xmlPin.setIcon(icon);

        // Coordinates
        Coordinates coordinates = new Coordinates();
        coordinates.setLongitude(pin.getLongitude());
        coordinates.setLatitude(pin.getLatitude());
        xmlPin.setCoordinates(coordinates);

        return xmlPin;
    }
}
