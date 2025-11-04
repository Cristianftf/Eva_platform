package com.backend.controller;

import com.backend.dto.LessonResponse;
import com.backend.dto.ModuleResponse;
import com.backend.service.CourseContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/content")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CourseContentController {
    private final CourseContentService contentService;

    @GetMapping("/modules")
    public ResponseEntity<List<ModuleResponse>> getCourseModules(@PathVariable String courseId) {
        return ResponseEntity.ok(contentService.getCourseModules(courseId));
    }

    @GetMapping("/lessons/{lessonId}")
    public ResponseEntity<LessonResponse> getLesson(
            @PathVariable String courseId,
            @PathVariable Long lessonId) {
        return ResponseEntity.ok(contentService.getLesson(lessonId));
    }

    @PostMapping("/lessons/{lessonId}/complete")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN')")
    public ResponseEntity<Void> markLessonAsCompleted(
            @PathVariable String courseId,
            @PathVariable Long lessonId) {
        contentService.markLessonAsCompleted(lessonId);
        return ResponseEntity.ok().build();
    }
}