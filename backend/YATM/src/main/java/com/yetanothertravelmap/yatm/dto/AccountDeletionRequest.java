package com.yetanothertravelmap.yatm.dto;

import com.yetanothertravelmap.yatm.model.User;

public class AccountDeletionRequest {
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

    public AccountDeletionRequest(User user, String currentPassword){
        this.user = user;
        this.password = currentPassword;
    }
}
