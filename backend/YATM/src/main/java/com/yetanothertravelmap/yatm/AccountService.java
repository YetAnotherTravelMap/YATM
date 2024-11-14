package com.yetanothertravelmap.yatm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    public AccountService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User saveUser(User user){
        user.setHash(encoder.encode(user.getHash()));
        return userRepository.save(user);
    }

    public User getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
}