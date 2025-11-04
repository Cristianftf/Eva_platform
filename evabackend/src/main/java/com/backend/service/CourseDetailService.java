package com.backend.service;

import com.backend.dto.*;
import com.backend.model.Course;
import com.backend.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CourseDetailService {

    private final CourseRepository courseRepository;
    private final DiscussionService discussionService;

    public CourseDetailService(CourseRepository courseRepository, DiscussionService discussionService) {
        this.courseRepository = courseRepository;
        this.discussionService = discussionService;
    }

    public Optional<CourseDetailDTO> getCourseDetail(@NonNull String courseId) {
        Optional<Course> co = courseRepository.findById(courseId);
        return co.map(c -> new CourseDetailDTO(
                c.getId(),
                c.getTitle(),
                "", // description not in model
                c.getInstructor() != null ? c.getInstructor().getFullName() : "-",
                "General",
                "Intermedio",
                "12 semanas",
                c.getStudents() != null ? c.getStudents().size() : 0,
                4.5,
                0,
                null,
                null,
                c.getUpdatedAt()
        ));
    }

    public List<ModuleDTO> getModules(@NonNull String courseId) {
        Optional<Course> co = courseRepository.findById(courseId);
        if (co.isEmpty()) return Collections.emptyList();
        Course c = co.get();
        int modules = c.getModulesCount() != null ? c.getModulesCount() : 3;
        List<ModuleDTO> result = new ArrayList<>();
        long lessonId = 1;
        for (int m = 1; m <= modules; m++) {
            int lessonsCount = 6;
            List<LessonDTO> lessons = new ArrayList<>();
            for (int l = 1; l <= lessonsCount; l++) {
                lessons.add(new LessonDTO(lessonId++, "Lección " + l, "video", 30, l % 2 == 0, l == 1, l == lessonsCount, l == 3));
            }
            result.add(new ModuleDTO((long)m, "Módulo " + m, m == 1, lessonsCount * 30, lessons.stream().filter(LessonDTO::isCompleted).mapToInt(LessonDTO::getDuration).sum(), lessons));
        }
        return result;
    }

    public List<AssignmentDTO> getAssignments(@NonNull String courseId) {
        Optional<Course> co = courseRepository.findById(courseId);
        if (co.isEmpty()) return Collections.emptyList();
        Course c = co.get();
        
        // Get the actual number of assignments or use default
        int assignments = c.getAssignmentsCount() != null ? c.getAssignmentsCount() : 3;
        List<AssignmentDTO> out = new ArrayList<>();
        
        // Create assignment data with more realistic criteria
        for (int i = 1; i <= assignments; i++) {
            List<String> requirements = new ArrayList<>();
            requirements.add("Implementar la funcionalidad principal");
            requirements.add("Crear pruebas unitarias");
            requirements.add("Documentar el código");
            
            List<AssignmentDTO.RubricItem> rubric = new ArrayList<>();
            rubric.add(new AssignmentDTO.RubricItem("Funcionalidad", 40));
            rubric.add(new AssignmentDTO.RubricItem("Calidad del Código", 30));
            rubric.add(new AssignmentDTO.RubricItem("Documentación", 30));
            
            AssignmentDTO ass = new AssignmentDTO((long)i,
                    "Proyecto: " + (i == assignments ? "Final" : "Tarea " + i),
                    "Implementación de " + (i == assignments ? "proyecto final" : "funcionalidad " + i),
                    "En esta tarea deberás desarrollar " + (i == assignments ? "el proyecto final que integra todos los conceptos del curso" : "la funcionalidad " + i + " siguiendo las mejores prácticas"),
                    LocalDateTime.now().plusDays(i * 7L),
                    100,
                    i % 3 == 0 ? "submitted" : (i % 2 == 0 ? "completed" : "pending"),
                    requirements,
                    rubric
            );
            out.add(ass);
        }
        return out;
    }

    public List<DiscussionDTO> getDiscussions(@NonNull String courseId) {
        try {
            return discussionService.getByCourse(courseId);
        } catch (Exception ex) {
            return Collections.emptyList();
        }
    }

    public List<GradeDTO> getGrades(@NonNull String courseId, @NonNull Long studentId) {
        // Get grades for specific student in the course
        Optional<Course> co = courseRepository.findById(courseId);
        if (co.isEmpty()) return Collections.emptyList();
        Course c = co.get();
        
        // Verify if student is enrolled in the course
        if (c.getStudents() == null || c.getStudents().stream()
                .noneMatch(student -> student.getId().equals(studentId))) {
            return Collections.emptyList();
        }

        // Get actual assignments
        int assignments = c.getAssignmentsCount() != null ? c.getAssignmentsCount() : 3;
        List<GradeDTO> grades = new ArrayList<>();
        
        // For each assignment, create a grade record
        for (int i = 1; i <= assignments; i++) {
            // Calculate a pseudo-random but consistent grade based on studentId and assignmentId
            double baseScore = 80.0 + (studentId + i) % 20;
            GradeDTO g = new GradeDTO((long)i,
                    "Tarea " + i,
                    "assignments",
                    baseScore,
                    100,
                    (int)baseScore,
                    LocalDateTime.now().minusDays(i * 2L),
                    true,
                    baseScore >= 90 ? "¡Excelente trabajo!" : 
                        (baseScore >= 80 ? "Buen trabajo" : "Necesita mejorar"),
                    Collections.emptyList());
            grades.add(g);
        }
        return grades;
    }

    public CourseStatsDTO getCourseStats(@NonNull String courseId) {
        Optional<Course> co = courseRepository.findById(courseId);
        if (co.isEmpty()) return new CourseStatsDTO(0,0,"",0,0,0,0);
        Course c = co.get();
        int total = c.getAssignmentsCount() != null ? c.getAssignmentsCount() : 3;
        return new CourseStatsDTO(85, 92, "Assignment 2", 2, total, 10, c.getStudents() != null ? c.getStudents().size() : 0);
    }
}
