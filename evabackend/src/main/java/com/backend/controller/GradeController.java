package com.backend.controller;

import com.backend.dto.GradeDTO;
import com.backend.service.GradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/grades")
@RequiredArgsConstructor
public class GradeController {
    private final GradeService gradeService;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<GradeDTO>> getStudentGrades(
            @PathVariable @NonNull String courseId,
            @PathVariable @NonNull Long studentId) {
        return ResponseEntity.ok(gradeService.getStudentCourseGrades(studentId, courseId));
    }

    @GetMapping("/student/{studentId}/average")
    public ResponseEntity<Double> getStudentAverage(
            @PathVariable @NonNull String courseId,
            @PathVariable @NonNull Long studentId) {
        return ResponseEntity.ok(gradeService.calculateCourseAverage(studentId, courseId));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<GradeDTO>> getRecentGrades(@PathVariable @NonNull String courseId) {
        return ResponseEntity.ok(gradeService.getRecentGrades(courseId));
    }
}