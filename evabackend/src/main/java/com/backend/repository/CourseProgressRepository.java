package com.backend.repository;

import com.backend.model.CourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseProgressRepository extends JpaRepository<CourseProgress, Long> {
    List<CourseProgress> findByUserId(Long userId);
    List<CourseProgress> findByUserIdOrderByGradeDesc(Long userId);
    Double findAverageGradeByUserId(Long userId);
}