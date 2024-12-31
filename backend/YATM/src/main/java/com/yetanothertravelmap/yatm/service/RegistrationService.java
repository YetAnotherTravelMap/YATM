package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final MapRepository mapRepository;


    public RegistrationService(UserRepository userRepository, MapRepository mapRepository){
        this.userRepository = userRepository;
        this.mapRepository = mapRepository;
    }

    public User saveUser(User user){
        user.setHash(encoder.encode(user.getHash()));
        User savedUser = userRepository.save(user);
        Map userMap = new Map("Travel Map", savedUser);
        mapRepository.save(userMap);
        return savedUser;
    }

    public User getUserByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }
}