package com.yetanothertravelmap.yatm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public User getUserByUsername(@RequestParam(value = "username") String username){
        return userService.getUserByUsername(username);
    }

    @PostMapping
    public void createUser(@RequestBody User user){
        User existingUser = userService.getUserByUsername(user.getUsername());

        if(existingUser!=null){
            userService.saveUser(user);
        }
    }
}
