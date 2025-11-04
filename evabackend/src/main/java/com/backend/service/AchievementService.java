package com.backend.service;

import com.backend.dto.AchievementDTO;
import com.backend.model.Achievement;
import com.backend.repository.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.time.format.DateTimeFormatter;

@Service
public class AchievementService {
    @Autowired
    private AchievementRepository achievementRepository;

    public List<AchievementDTO> getUserAchievements(Long userId) {
        List<Achievement> achievements = achievementRepository.findByUserId(userId);
        return achievements.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AchievementDTO> getUserAchievementsByCategory(Long userId, String category) {
        List<Achievement> achievements = achievementRepository.findByUserIdAndCategory(userId, category);
        return achievements.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AchievementDTO updateAchievementProgress(Long achievementId, Integer progress) {
        Achievement achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new RuntimeException("Logro no encontrado"));

        achievement.setProgress(progress);
        if (progress >= 100) {
            achievement.setEarned(true);
        }

        achievement = achievementRepository.save(achievement);
        return convertToDTO(achievement);
    }

    private AchievementDTO convertToDTO(Achievement achievement) {
        AchievementDTO dto = new AchievementDTO();
        dto.setId(achievement.getId());
        dto.setTitle(achievement.getTitle());
        dto.setDescription(achievement.getDescription());
        dto.setIcon(achievement.getIcon());
        dto.setColor(achievement.getColor());
        dto.setBgColor(achievement.getBgColor());
        dto.setBorderColor(achievement.getBorderColor());
        dto.setCategory(achievement.getCategory());
        dto.setEarned(achievement.isEarned());
        dto.setEarnedDate(achievement.getEarnedDate() != null ? 
                achievement.getEarnedDate().format(DateTimeFormatter.ISO_DATE) : null);
        dto.setRarity(achievement.getRarity());
        dto.setProgress(achievement.getProgress());
        return dto;
    }
}