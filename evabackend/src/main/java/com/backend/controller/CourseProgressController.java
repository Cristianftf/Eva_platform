package com.backend.controller;

import com.backend.dto.CourseProgressDTO;
import com.backend.service.CourseProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/course-progress")
@CrossOrigin(origins = "*")
public class CourseProgressController {
    @Autowired
    private CourseProgressService courseProgressService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CourseProgressDTO>> getUserCourseProgress(@PathVariable Long userId) {
        List<CourseProgressDTO> progress = courseProgressService.getUserCourseProgress(userId);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/user/{userId}/top")
    public ResponseEntity<List<CourseProgressDTO>> getTopPerformingCourses(@PathVariable Long userId) {
        List<CourseProgressDTO> topCourses = courseProgressService.getTopPerformingCourses(userId);
        return ResponseEntity.ok(topCourses);
    }

    @GetMapping("/user/{userId}/average")
    public ResponseEntity<Double> getAverageGrade(@PathVariable Long userId) {
        Double average = courseProgressService.calculateAverageGrade(userId);
        return ResponseEntity.ok(average);
    }
}