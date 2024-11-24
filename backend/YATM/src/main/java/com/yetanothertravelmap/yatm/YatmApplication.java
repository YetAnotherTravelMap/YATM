package com.yetanothertravelmap.yatm;

import com.yetanothertravelmap.yatm.model.User;
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
    CommandLineRunner commandLineRunner(UserRepository users, PasswordEncoder encoder) {
        return args -> {
            File profilePictureFile = new File("C:/Users/Daniel/Downloads/socks.jpg");
            byte[] profilePictureBytes = Files.readAllBytes(profilePictureFile.toPath());
            users.save(new User("Test1", "User", encoder.encode("pass1"), "test1", "test@email.com",profilePictureBytes));
            users.save(new User("Test2", "User", encoder.encode("pass2"), "test2", "test2@email.com"));
        };
    }

}
