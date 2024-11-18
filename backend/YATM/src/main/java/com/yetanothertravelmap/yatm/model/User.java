package com.yetanothertravelmap.yatm.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "app_user")
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
    private byte[] profilePicture;

    @OneToMany(mappedBy = "user")
    private Set<Map> maps;


    public User(String firstName, String lastName, String hash, String username, String email, byte[] profilePicture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hash = hash;
        this.username = username;
        this.email = email;
        this.profilePicture = profilePicture;
    }

    public User(String firstName, String lastName, String hash, String username, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hash = hash;
        this.username = username;
        this.email = email;
    }

    public User(){}

    @Override
    public String toString(){
        return "[User: " + username + "\nFirst Name: " + firstName + "\nLast Name: " + lastName + "\nEmail: " + email + "\nHash: " + hash+"]";
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

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }
}
