package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class AccountService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AccountService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public boolean changePassword(User user, String password){
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        if(optionalUser.isPresent()){
            User updatedUser = optionalUser.get();
            updatedUser.setHash(encoder.encode(password));
            userRepository.save(updatedUser);
            return true;
        }
        return false;
    }

    public boolean changeProfilePicture(long userId, MultipartFile profilePicture){
        Optional<User> optionalUser = userRepository.findByUserId(userId);
        if(optionalUser.isPresent()){
            try {
                User updatedUser = optionalUser.get();
                updatedUser.setProfilePicture(profilePicture.getBytes());
                userRepository.save(updatedUser);
                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return false;
    }
}
