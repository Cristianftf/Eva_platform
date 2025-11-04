package com.backend.service;

import com.backend.dto.StudyActivityDTO;
import com.backend.model.StudyActivity;
import com.backend.repository.StudyActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@Service
public class StudyActivityService {
    @Autowired
    private StudyActivityRepository studyActivityRepository;

    public List<StudyActivityDTO> getWeeklyStudyActivity(Long userId) {
        LocalDate startDate = LocalDate.now().minusDays(7);
        LocalDate endDate = LocalDate.now();
        
        List<StudyActivity> activities = studyActivityRepository
                .findByUserIdAndDateBetween(userId, startDate, endDate);
                
        return activities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Map<String, Integer> getStudyPatterns(Long userId) {
        List<StudyActivity> activities = studyActivityRepository.findByUserId(userId);
        
        Map<String, Integer> patterns = new HashMap<>();
        patterns.put("morning", 0);
        patterns.put("afternoon", 0);
        patterns.put("evening", 0);

        for (StudyActivity activity : activities) {
            String timeOfDay = activity.getTimeOfDay();
            patterns.put(timeOfDay, patterns.get(timeOfDay) + 1);
        }

        return patterns;
    }

    public StudyActivityDTO recordStudyActivity(Long userId, StudyActivityDTO activityDTO) {
        StudyActivity activity = new StudyActivity();
        activity.setDate(LocalDate.now());
        activity.setDayOfWeek(LocalDate.now().getDayOfWeek().toString());
        activity.setHours(activityDTO.getHours());
        activity.setSessions(activityDTO.getSessions());
        activity.setTimeOfDay(activityDTO.getTimeOfDay());

        activity = studyActivityRepository.save(activity);
        return convertToDTO(activity);
    }

    private StudyActivityDTO convertToDTO(StudyActivity activity) {
        StudyActivityDTO dto = new StudyActivityDTO();
        dto.setDay(activity.getDayOfWeek());
        dto.setHours(activity.getHours());
        dto.setSessions(activity.getSessions());
        dto.setTimeOfDay(activity.getTimeOfDay());
        return dto;
    }
}