package com.backend.controller;

import com.backend.dto.UserProfileDTO;
import com.backend.model.User;
import com.backend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class UserProfileController {
    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long userId) {
        UserProfileDTO profile = userProfileService.getUserProfile(userId);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Void> updateUserProfile(
            @PathVariable Long userId,
            @RequestBody UserProfileDTO profileDTO) {
        userProfileService.updateUserProfile(userId, profileDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{userId}/settings")
    public ResponseEntity<Void> updateUserSettings(
            @PathVariable Long userId,
            @RequestBody User userSettings) {
        userProfileService.updateUserSettings(userId, userSettings);
        return ResponseEntity.ok().build();
    }
}