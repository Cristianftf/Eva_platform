package com.backend.service;

import com.backend.dto.CourseProgressDTO;
import com.backend.model.CourseProgress;
import com.backend.model.User;
import com.backend.repository.CourseProgressRepository;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseProgressService {
    @Autowired
    private CourseProgressRepository courseProgressRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CourseProgressDTO> getUserCourseProgress(@NonNull Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                
        List<CourseProgress> progressList = courseProgressRepository.findByUserId(userId);
        return progressList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CourseProgressDTO> getTopPerformingCourses(@NonNull Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                
        List<CourseProgress> progressList = courseProgressRepository
                .findByUserIdOrderByGradeDesc(userId);
        return progressList.stream()
                .limit(5)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true) 
    public Double calculateAverageGrade(@NonNull Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                
        return courseProgressRepository.findAverageGradeByUserId(userId);
    }

    private CourseProgressDTO convertToDTO(CourseProgress progress) {
        CourseProgressDTO dto = new CourseProgressDTO();
        dto.setCourseName(progress.getCourseName());
        dto.setCompletedPercentage(progress.getCompletedPercentage());
        dto.setTotalUnits(progress.getTotalUnits());
        dto.setGrade(progress.getGrade());
        dto.setLastActivity(progress.getLastActivity().format(DateTimeFormatter.ISO_DATE));
        return dto;
    }
}