package com.backend.service;

import com.backend.dto.GradeDTO;
import com.backend.model.Grade;
import com.backend.repository.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GradeService {
    private final GradeRepository gradeRepository;

    @Transactional(readOnly = true)
    public List<GradeDTO> getStudentCourseGrades(@NonNull Long studentId, @NonNull String courseId) {
        return gradeRepository.findByStudent_IdAndAssignment_Course_Id(studentId, courseId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Double calculateCourseAverage(@NonNull Long studentId, @NonNull String courseId) {
        return gradeRepository.calculateAverageGrade(studentId, courseId);
    }

    @Transactional(readOnly = true)
    public List<GradeDTO> getRecentGrades(@NonNull String courseId) {
        return gradeRepository.findRecentGradesByCourseId(courseId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private GradeDTO mapToDTO(Grade grade) {
        GradeDTO dto = new GradeDTO();
        dto.setId(grade.getId());
        dto.setStudentId(grade.getStudent().getId());
        dto.setStudentName(grade.getStudent().getFullName());
        dto.setAssignmentId(grade.getAssignment().getId());
        dto.setAssignmentTitle(grade.getAssignment().getTitle());
        dto.setScore(grade.getScore());
        dto.setFeedback(grade.getFeedback());
        dto.setSubmittedAt(grade.getSubmittedAt());
        dto.setGradedAt(grade.getGradedAt());
        return dto;
    }
}