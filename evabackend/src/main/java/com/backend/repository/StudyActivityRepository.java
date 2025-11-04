package com.backend.repository;

import com.backend.model.StudyActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface StudyActivityRepository extends JpaRepository<StudyActivity, Long> {
    List<StudyActivity> findByUserId(Long userId);
    List<StudyActivity> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    List<StudyActivity> findByUserIdAndTimeOfDay(Long userId, String timeOfDay);
}