package com.yetanothertravelmap.yatm;

import com.yetanothertravelmap.yatm.model.Icon;
import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.repository.IconRepository;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

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
    @Order(2)
    CommandLineRunner commandLineRunner(UserRepository users, PasswordEncoder encoder, PinRepository pinRepository, MapRepository mapRepository, IconRepository iconRepository) {
        return args -> {
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
            myPin.setMainCategory("Been");
            myPin.setMap(userMap);
            Icon icon = iconRepository.findById(1L).orElse(null);
            myPin.setIcon(icon);
            myPin.setCountryCode("ca");
            pinRepository.save(myPin);
        };
    }

    @Bean
    @Order(1)
    CommandLineRunner commandLineRunnerForPredefinedPins(IconRepository iconRepository) {
        return args -> {
            ClassLoader cl = this.getClass().getClassLoader();
            ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver(cl);
            Resource[] resources = resolver.getResources("classpath:images/pinIcons/*.png") ;

            for (Resource imageFile: resources){
                String fileName = imageFile.getFilename();

                byte[] imageData = imageFile.getContentAsByteArray();

                Icon icon = new Icon();
                icon.setIconName(fileName);
                icon.setImage(imageData);
                icon.setWidth(35);
                icon.setHeight(35);
                iconRepository.save(icon);
            }
        };
    }

}
