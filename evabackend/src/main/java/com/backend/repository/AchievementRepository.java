package com.backend.repository;

import com.backend.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findByUserId(Long userId);
    List<Achievement> findByUserIdAndCategory(Long userId, String category);
    long countByUserIdAndEarned(Long userId, boolean earned);
}