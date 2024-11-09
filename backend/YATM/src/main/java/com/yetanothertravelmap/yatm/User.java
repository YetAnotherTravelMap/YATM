package com.yetanothertravelmap.yatm;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Blob;

@Entity
public class User {

    @Id
    @GeneratedValue
    private long userId;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String hash;

    @Column
    private String username;

    @Column
    private String email;

    @Column
    private Blob profilePicture;

    public User(String firstName, String lastName, String hash, String username, String email, Blob profilePicture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hash = hash;
        this.username = username;
        this.email = email;
        this.profilePicture = profilePicture;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Blob getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(Blob profilePicture) {
        this.profilePicture = profilePicture;
    }
}
