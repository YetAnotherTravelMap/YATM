package com.yetanothertravelmap.yatm.dto;

import org.springframework.web.multipart.MultipartFile;

public class ChangeProfilePictureRequest {
    private long userId;
    private MultipartFile profilePicture;

    public long getUserId() {
        return userId;
    }

    public void setUser(long userId) {
        this.userId = userId;
    }

    public MultipartFile getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePictureBytes(MultipartFile profilePicture) {
        this.profilePicture = profilePicture;
    }

    public ChangeProfilePictureRequest(long userId, MultipartFile profilePicture){
        this.userId = userId;
        this.profilePicture = profilePicture;
    }
}
