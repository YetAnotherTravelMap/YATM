package com.yetanothertravelmap.yatm.controller;

import com.yetanothertravelmap.yatm.service.AccountService;
import com.yetanothertravelmap.yatm.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;

import java.security.Principal;
import java.util.Map;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @GetMapping
    public Map<String, Object> getUserByUsername(Principal principal){
        User user = accountService.getUserByUsername(principal.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("firstname", user.getFirstName());
        response.put("lastname", user.getLastName());
        response.put("email", user.getEmail());
        response.put("username", user.getUsername());
        return response;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        User existingUser = accountService.getUserByUsername(user.getUsername());
        User existingEmail = accountService.getUserByEmail(user.getEmail());
        if(existingUser!=null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account with that username already exists.");
        }
        else if(existingEmail!=null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account with that email address already exists.");
        }
        else{
            return ResponseEntity.ok(accountService.saveUser(user));
        }
    }
}
