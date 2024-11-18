package com.yetanothertravelmap.yatm.repository;

import com.yetanothertravelmap.yatm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
}