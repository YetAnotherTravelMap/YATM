package com.yetanothertravelmap.yatm.controller;

import com.yetanothertravelmap.yatm.dto.ChangePasswordRequest;
import com.yetanothertravelmap.yatm.service.AccountService;
import com.yetanothertravelmap.yatm.service.RegistrationService;
import com.yetanothertravelmap.yatm.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class AccountController {

    private final RegistrationService registrationService;
    private final AccountService accountService;

    public AccountController(RegistrationService registrationService, AccountService accountService){
        this.registrationService = registrationService;
        this.accountService = accountService;
    }

    @GetMapping
    public Map<String, Object> getUserByUsername(Principal principal){
        User user = registrationService.getUserByUsername(principal.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("firstname", user.getFirstName());
        response.put("lastname", user.getLastName());
        response.put("email", user.getEmail());
        response.put("username", user.getUsername());
        response.put("profilePicture", user.getProfilePicture());
        response.put("mapIdArray", user.getMapIds());
        response.put("userId", user.getId());
        return response;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        User existingUser = registrationService.getUserByUsername(user.getUsername());
        User existingEmail = registrationService.getUserByEmail(user.getEmail());
        if(existingUser!=null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account with that username already exists.");
        }
        else if(existingEmail!=null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account with that email address already exists.");
        }
        else{
            return ResponseEntity.ok(registrationService.saveUser(user));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
        User user = request.getUser();
        String password = request.getPassword();

        return ResponseEntity.ok(accountService.changePassword(user, password));
    }

    @PostMapping("/change-profile-picture")
    public ResponseEntity<?> changeProfilePicture(@RequestParam long userId, @RequestParam MultipartFile profilePicture){

        boolean success = accountService.changeProfilePicture(userId, profilePicture);

        if(success){
            return ResponseEntity.ok("Profile picture changed successfully");
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update profile picture");
        }
    }
}
