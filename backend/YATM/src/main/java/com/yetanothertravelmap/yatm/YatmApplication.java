package com.yetanothertravelmap.yatm;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.nio.file.Files;

@SpringBootApplication
public class YatmApplication {

    public static void main(String[] args) {
        SpringApplication.run(YatmApplication.class, args);
    }

    @Bean
    WebClient webClient(WebClient.Builder builder) {
        return builder.baseUrl("https://nominatim.openstreetmap.org").build();
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository users, PasswordEncoder encoder, PinRepository pinRepository, MapRepository mapRepository) {
        return args -> {
//            File profilePictureFile = new File("C:/Users/Daniel/Downloads/socks.jpg");
//            byte[] profilePictureBytes = Files.readAllBytes(profilePictureFile.toPath());

            User user1 = new User(encoder.encode("pass1"), "test1", "test@email.com");
            users.save(user1);
            User user2 = new User(encoder.encode("pass2"), "test2", "test2@email.com");
            users.save(user2);

            Map userMap = new Map("Travel Map", user1);
            Map userMap1 = new Map("Travel Map2", user1);
            Map userMap2 = new Map("Travel Map3", user1);
            Map userMap3 = new Map("Travel Map4", user2);

            mapRepository.save(userMap);
            mapRepository.save(userMap1);
            mapRepository.save(userMap2);
            mapRepository.save(userMap3);
            user1.getMaps().add(userMap);
            user1.getMaps().add(userMap1);
            user1.getMaps().add(userMap2);
            user2.getMaps().add(userMap3);
            users.save(user1);
            users.save(user2);

            Pin myPin = new Pin("pinName", 45.3832, -75.6974, "Carleton University");
            myPin.setMap(userMap);
            pinRepository.save(myPin);
        };
    }

}
