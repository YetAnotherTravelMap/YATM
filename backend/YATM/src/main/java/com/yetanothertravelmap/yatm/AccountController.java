package com.yetanothertravelmap.yatm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @GetMapping
    public User getUserByUsername(@RequestParam(value = "username") String username){
        return accountService.getUserByUsername(username);
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
