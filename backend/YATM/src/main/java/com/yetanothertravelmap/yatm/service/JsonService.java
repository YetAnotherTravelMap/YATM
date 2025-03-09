package com.yetanothertravelmap.yatm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yetanothertravelmap.yatm.dto.PinRequest;
import com.yetanothertravelmap.yatm.dto.json.*;
import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.GeocodingRecord;
import com.yetanothertravelmap.yatm.model.Pin;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JsonService {
    private final GeocodingService geocodingService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonService(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    public FeatureCollection getJsonFeatureCollectionFromPins(Set<Pin> pins) throws JsonProcessingException {
        FeatureCollection featureCollection = new FeatureCollection();
        List<Feature> features = pins.stream()
                .map(this::toFeature)
                .collect(Collectors.toList());
        featureCollection.setFeatures(features);
        return featureCollection;
    }

    public List<PinRequest> getPinRequestsFromJsonFeatureCollection(FeatureCollection featureCollection) throws JsonProcessingException {
        List<PinRequest> pinRequests = new ArrayList<>();

        if(featureCollection.getFeatures() == null) {
            return pinRequests;
        }

        for (Feature feature : featureCollection.getFeatures()) {
            PinRequest pinRequest = new PinRequest();
            List<Double> coords = feature.getGeometry().getCoordinates();
            pinRequest.setLongitude(coords.get(0));
            pinRequest.setLatitude(coords.get(1));

            Properties props = feature.getProperties();
            pinRequest.setName(props.getName() != null ? props.getName() : "Unnamed Pin");
            pinRequest.setMainCategory(props.getMainCategory() != null ? props.getMainCategory() : "Imported");
            pinRequest.setDescription(props.getDescription() != null ? props.getDescription() : "");
            pinRequest.setCountry(props.getCountry() != null ? props.getCountry() : "");
            pinRequest.setCountryCode(props.getCountryCode() != null ? props.getCountryCode() : "");
            pinRequest.setSubCategories(props.getCategories() != null ? props.getCategories() : List.of());

            if (props.getIcon() != null) {
                Icon icon = props.getIcon();
                pinRequest.setIconName(icon.getIconName());
                pinRequest.setIconWidth(icon.getWidth());
                pinRequest.setIconHeight(icon.getHeight());
                pinRequest.setIconImageBytes(Base64.getDecoder().decode(icon.getImage()));
            } else {
                pinRequest.setIconId(1L); // Default icon ID
            }

            // Use default values for null or invalid icon attributes
            if (pinRequest.getIconName() == null || pinRequest.getIconImageBytes() == null ||
                    pinRequest.getIconHeight() == 0 || pinRequest.getIconWidth() == 0) {
                pinRequest.setIconId(1L);
            }

            // Geocoding if country or country code is missing
            if (pinRequest.getCountryCode() == null || pinRequest.getCountry() == null) {
                GeocodingRecord geocodingRecord = geocodingService.getReverseGeocodingResults(
                        pinRequest.getLatitude().toString(), pinRequest.getLongitude().toString()).blockFirst();
                if (geocodingRecord != null) {
                    pinRequest.setCountry(geocodingRecord.address().country());
                    pinRequest.setCountryCode(geocodingRecord.address().country_code());
                }
            }

            pinRequests.add(pinRequest);
        }
        return pinRequests;
    }

    private Feature toFeature(Pin pin) {
        Feature feature = new Feature();
        feature.setGeometry(toGeometry(pin.getLatitude(), pin.getLongitude()));
        feature.setProperties(toProperties(pin));
        return feature;
    }

    private Geometry toGeometry(double latitude, double longitude) {
        Geometry geometry = new Geometry();
        geometry.setCoordinates(List.of(longitude, latitude));
        return geometry;
    }

    private Properties toProperties(Pin pin) {
        Properties properties = new Properties();
        properties.setName(pin.getName());
        properties.setMainCategory(pin.getMainCategory());
        properties.setDescription(pin.getDescription());
        properties.setCountry(pin.getCountry());
        properties.setCountryCode(pin.getCountryCode());
        properties.setCategories(pin.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toList()));
        properties.setIcon(toIcon(pin.getIcon()));
        return properties;
    }

    private Icon toIcon(com.yetanothertravelmap.yatm.model.Icon pinIcon) {
        Icon icon = new Icon();
        icon.setIconName(pinIcon.getIconName());
        icon.setWidth(pinIcon.getWidth());
        icon.setHeight(pinIcon.getHeight());
        icon.setImage(Base64.getEncoder().encodeToString(pinIcon.getImage()));
        return icon;
    }
}
