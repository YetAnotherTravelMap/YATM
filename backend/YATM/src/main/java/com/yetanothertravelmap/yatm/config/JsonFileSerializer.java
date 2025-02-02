package com.yetanothertravelmap.yatm.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.yetanothertravelmap.yatm.dto.JsonFile;
import com.yetanothertravelmap.yatm.model.Category;
import com.yetanothertravelmap.yatm.model.Icon;
import com.yetanothertravelmap.yatm.model.Pin;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;
import java.util.Base64;
import java.util.Set;

@JsonComponent
public class JsonFileSerializer extends JsonSerializer<JsonFile> {

    @Override
    public void serialize(JsonFile jsonFile, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        jsonGenerator.writeArrayFieldStart("features");
        for (Pin pin : jsonFile.getPins()){
            serializePin(jsonGenerator, pin);
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeStringField("type", "FeatureCollection");
        jsonGenerator.writeEndObject();

    }

    private void serializePin(JsonGenerator jsonGenerator, Pin pin) throws IOException {
        jsonGenerator.writeStartObject();
        serializeGeometry(jsonGenerator, pin.getLatitude(), pin.getLongitude());
        serializeProperties(jsonGenerator, pin);
        jsonGenerator.writeStringField("type", "Feature");
        jsonGenerator.writeEndObject();
    }

    private void serializeProperties(JsonGenerator jsonGenerator, Pin pin) throws IOException {
        jsonGenerator.writeObjectFieldStart("properties");
        jsonGenerator.writeStringField("name", pin.getName());
        jsonGenerator.writeStringField("main_category", pin.getMainCategory());
        jsonGenerator.writeStringField("description", pin.getDescription());
        jsonGenerator.writeStringField("country_code", pin.getCountryCode());
        serializeCategories(jsonGenerator, pin.getCategories());
        serializeIcon(jsonGenerator, pin.getIcon());
        jsonGenerator.writeEndObject();
    }

    private void serializeIcon(JsonGenerator jsonGenerator, Icon icon) throws IOException {
        jsonGenerator.writeObjectFieldStart("icon");

        jsonGenerator.writeStringField("icon_name", icon.getIconName());
        jsonGenerator.writeNumberField("icon_width", icon.getWidth());
        jsonGenerator.writeNumberField("icon_height", icon.getHeight());
        jsonGenerator.writeStringField("icon_image", Base64.getEncoder().encodeToString(icon.getImage()));

        jsonGenerator.writeEndObject();
    }

    private void serializeCategories(JsonGenerator jsonGenerator, Set<Category> categories) throws IOException {
        jsonGenerator.writeArrayFieldStart("categories");
        for (Category category : categories){
            jsonGenerator.writeString(category.getName());
        }
        jsonGenerator.writeEndArray();
    }

    private void serializeGeometry(JsonGenerator jsonGenerator, double latitude, double longitude) throws IOException {
        jsonGenerator.writeObjectFieldStart("geometry");

        jsonGenerator.writeArrayFieldStart("coordinates");
        jsonGenerator.writeNumber(longitude);
        jsonGenerator.writeNumber(latitude);
        jsonGenerator.writeEndArray();

        jsonGenerator.writeStringField("type", "Point");
        jsonGenerator.writeEndObject();
    }
}
