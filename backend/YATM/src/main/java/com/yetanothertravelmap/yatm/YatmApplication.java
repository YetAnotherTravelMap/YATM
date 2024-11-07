package com.yetanothertravelmap.yatm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class YatmApplication {

    public static void main(String[] args) {
        SpringApplication.run(YatmApplication.class, args);
    }

    @Bean
    WebClient webClient(WebClient.Builder builder) {
        return builder.baseUrl("https://nominatim.openstreetmap.org").build();
    }

}
