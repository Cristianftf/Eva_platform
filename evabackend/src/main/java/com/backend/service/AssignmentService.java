package com.backend.service;

import com.backend.dto.AssignmentDTO;
import com.backend.model.Assignment;
import com.backend.model.Grade;
import com.backend.repository.AssignmentRepository;
import com.backend.repository.CourseRepository;
import com.backend.repository.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final CourseRepository courseRepository;
    private final GradeRepository gradeRepository;

    @Transactional(readOnly = true)
    public List<AssignmentDTO> getCourseAssignments(@NonNull String courseId) {
        // Verificar que el curso existe
        courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
                
        return assignmentRepository.findByCourseId(courseId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AssignmentDTO> getUpcomingAssignments(@NonNull String courseId) {
        // Verificar que el curso existe
        courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
                
        return assignmentRepository.findUpcomingAssignmentsByCourseId(courseId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AssignmentDTO mapToDTO(Assignment assignment) {
        AssignmentDTO dto = new AssignmentDTO();
        dto.setId(assignment.getId());
        dto.setTitle(assignment.getTitle());
        
        // Manejar las diferentes versiones de descripción
        String description = assignment.getDescription();
        dto.setDescription(description);
        dto.setShortDescription(description != null ? 
            (description.length() > 100 ? description.substring(0, 97) + "..." : description) 
            : "");
        dto.setFullDescription(description);
        
        dto.setDueDate(assignment.getDueDate());
        dto.setMaxPoints(assignment.getMaxPoints());
        dto.setCourseId(assignment.getCourse().getId());
        dto.setCreatedAt(assignment.getCreatedAt());
        dto.setUpdatedAt(assignment.getUpdatedAt());
        
        // Calcular estadísticas
        List<Grade> grades = gradeRepository.findByAssignment_Id(assignment.getId());
        if (!grades.isEmpty()) {
            double averageScore = grades.stream()
                    .mapToDouble(Grade::getScore)
                    .average()
                    .orElse(0.0);
            dto.setAverageScore(averageScore);
            dto.setSubmissionCount(grades.size());
            dto.setPendingGradeCount((int) grades.stream()
                    .filter(g -> g.getGradedAt() == null)
                    .count());
        } else {
            dto.setAverageScore(0.0);
            dto.setSubmissionCount(0);
            dto.setPendingGradeCount(0);
        }
        
        return dto;
    }
}