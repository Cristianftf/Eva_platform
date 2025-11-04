package com.backend.repository;

import com.backend.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUserId(Long userId);
    List<Goal> findByUserIdAndCategory(Long userId, String category);
    List<Goal> findByUserIdAndStatus(Long userId, String status);
    long countByUserIdAndStatus(Long userId, String status);
}