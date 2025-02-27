package com.yetanothertravelmap.yatm.config;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.yetanothertravelmap.yatm.dto.JsonFile;
import com.yetanothertravelmap.yatm.dto.PinRequest;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;
import java.util.*;

@JsonComponent
public class JsonFileDeserializer extends JsonDeserializer<JsonFile> {

    @Override
    public JsonFile deserialize(JsonParser parser, DeserializationContext context) throws IOException, JacksonException {
        JsonNode jsonNode = parser.getCodec().readTree(parser);
        JsonNode features = jsonNode.get("features");
        List<PinRequest> pinRequests = new ArrayList<>();
        if (features.isArray()) {
            for (JsonNode feature : features) {
                PinRequest pin = new PinRequest();

                JsonNode coordinates = feature.get("geometry").get("coordinates");
                pin.setLongitude(coordinates.get(0).asDouble());
                pin.setLatitude(coordinates.get(1).asDouble());

                JsonNode properties = feature.get("properties");

                String pinName = properties.has("name") ? properties.get("name").asText() : "Unnamed Pin";
                pin.setName(pinName);
                String mainCategory = properties.has("main_category") ? properties.get("main_category").asText() : "Favourite";
                pin.setMainCategory(mainCategory);
                String description = properties.has("description") ? properties.get("description").asText() : "";
                pin.setDescription(description);
                String countryCode = properties.has("country_code") ? properties.get("country_code").asText() : "";
                pin.setCountryCode(countryCode);


                List<String> subCategories = new ArrayList<>();
                if (properties.has("categories")) {
                    JsonNode categoriesNode = properties.get("categories");
                    if (categoriesNode.isArray()) {
                        for (JsonNode node : categoriesNode) {
                            subCategories.add(node.asText());
                        }
                    }
                }
                pin.setSubCategories(subCategories);

                if (properties.has("icon")) {
                    JsonNode iconNode = properties.get("icon");
                    pin.setIconName(iconNode.get("icon_name").asText());
                    pin.setIconWidth(iconNode.get("icon_width").asInt());
                    pin.setIconHeight(iconNode.get("icon_height").asInt());
                    pin.setIconImageBytes(Base64.getDecoder().decode(iconNode.get("icon_image").asText()));
                }else {
                    Random rand = new Random();
                    pin.setIconId((long) (rand.nextInt(9)+1));
                }

                pinRequests.add(pin);
            }
        }
        return new JsonFile(pinRequests);
    }

}
