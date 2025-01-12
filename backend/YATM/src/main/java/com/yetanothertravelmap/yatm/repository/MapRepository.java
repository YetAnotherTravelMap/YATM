package com.yetanothertravelmap.yatm.repository;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MapRepository extends JpaRepository<Map, Long> {
    Optional<Map> findByMapId(Long mapId);
    Optional<Map> findByUserIdAndTitle(Long userId, String title);
    List<Map> findByUser(User user);

    @Modifying
    @Query("DELETE FROM Map m WHERE m.user = :user")
    void deleteByUser(@Param("user") User user);
}
