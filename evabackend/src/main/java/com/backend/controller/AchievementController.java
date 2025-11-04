package com.backend.controller;

import com.backend.dto.AchievementDTO;
import com.backend.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "*")
public class AchievementController {
    @Autowired
    private AchievementService achievementService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AchievementDTO>> getUserAchievements(@PathVariable Long userId) {
        List<AchievementDTO> achievements = achievementService.getUserAchievements(userId);
        return ResponseEntity.ok(achievements);
    }

    @GetMapping("/user/{userId}/category/{category}")
    public ResponseEntity<List<AchievementDTO>> getUserAchievementsByCategory(
            @PathVariable Long userId,
            @PathVariable String category) {
        List<AchievementDTO> achievements = achievementService.getUserAchievementsByCategory(userId, category);
        return ResponseEntity.ok(achievements);
    }

    @PutMapping("/{achievementId}/progress")
    public ResponseEntity<AchievementDTO> updateAchievementProgress(
            @PathVariable Long achievementId,
            @RequestParam Integer progress) {
        AchievementDTO updatedAchievement = achievementService.updateAchievementProgress(achievementId, progress);
        return ResponseEntity.ok(updatedAchievement);
    }
}