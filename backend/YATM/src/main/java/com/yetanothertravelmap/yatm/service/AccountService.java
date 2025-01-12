package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private final UserRepository userRepository;
    private final MapRepository mapRepository;
    private final PinRepository pinRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AccountService(UserRepository userRepository, MapRepository mapRepository, PinRepository pinRepository){
        this.userRepository = userRepository;
        this.mapRepository = mapRepository;
        this.pinRepository = pinRepository;
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

    @Transactional
    public boolean deleteAccount(User user, String password){
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        user = optionalUser.get();

        List<Map> maps = mapRepository.findByUser(user);
        System.out.println("maps size as: " + maps.size());
        for(Map map : maps){
            pinRepository.deleteByMap(map);
        }

        mapRepository.deleteByUser(user);

        userRepository.delete(user);
        return false;
    }
}
