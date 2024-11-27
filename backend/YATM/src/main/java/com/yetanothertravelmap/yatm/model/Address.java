package com.yetanothertravelmap.yatm.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Address(
        String house_number,
        String road,
        String neighbourhood,
        String suburb,
        String city,
        String state_district,
        String state,
        String ISO3166_2_lvl4,
        String postcode,
        String country,
        String country_code
) {
}
