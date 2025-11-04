package com.backend.service;

import com.backend.dto.LessonResponse;
import com.backend.dto.ModuleResponse;
import com.backend.model.Course;
import com.backend.model.CourseModule;
import com.backend.model.Lesson;
import com.backend.repository.CourseModuleRepository;
import com.backend.repository.CourseRepository;
import com.backend.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseContentService {
    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<ModuleResponse> getCourseModules(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<CourseModule> modules = moduleRepository.findByCourseIdWithLessons(courseId);
        return modules.stream()
                .map(this::mapToModuleResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LessonResponse getLesson(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        return mapToLessonResponse(lesson);
    }

    @Transactional
    public void markLessonAsCompleted(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        
        lesson.setCompleted(true);
        lessonRepository.save(lesson);

        // Update module completion status
        CourseModule module = lesson.getModule();
        long completedLessons = module.getLessons().stream()
                .filter(Lesson::getCompleted)
                .count();
        
        module.setCompletedLessons((int) completedLessons);
        module.setCompleted(completedLessons == module.getLessons().size());
        moduleRepository.save(module);
    }

    private ModuleResponse mapToModuleResponse(CourseModule module) {
        ModuleResponse response = new ModuleResponse();
        response.setId(module.getId());
        response.setTitle(module.getTitle());
        response.setOrder(module.getOrder());
        response.setLessons(module.getLessons().stream()
                .map(this::mapToLessonResponse)
                .collect(Collectors.toList()));
        response.setTotalDuration(module.getTotalDuration());
        response.setCompletedLessons(module.getCompletedLessons());
        response.setCompleted(module.getCompleted());
        return response;
    }

    private LessonResponse mapToLessonResponse(Lesson lesson) {
        LessonResponse response = new LessonResponse();
        response.setId(lesson.getId());
        response.setTitle(lesson.getTitle());
        response.setType(lesson.getType());
        response.setDuration(lesson.getDuration());
        response.setIsPreview(lesson.getIsPreview());
        response.setIsLocked(lesson.getIsLocked());
        response.setHasNotes(lesson.getHasNotes());
        response.setCompleted(lesson.getCompleted());
        response.setContentUrl(lesson.getContentUrl());
        return response;
    }
}