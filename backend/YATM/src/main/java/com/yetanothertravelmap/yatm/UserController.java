package com.yetanothertravelmap.yatm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
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
    public User createUser(@RequestBody User user){
        User existingUser = userService.getUserByUsername(user.getUsername());
        if(existingUser!=null){
            return null;
        }
        else{
            return userService.saveUser(user);
        }
    }
}
