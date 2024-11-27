package com.yetanothertravelmap.yatm.dto;

import com.yetanothertravelmap.yatm.model.User;

public class ChangePasswordRequest {
    private User user;
    private String password;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ChangePasswordRequest(User user, String password){
        this.user = user;
        this.password = password;
    }
}
