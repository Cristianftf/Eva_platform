package com.backend.controller;

import com.backend.dto.*;
import com.backend.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}/courses")
    public ResponseEntity<List<EnrolledCourseDTO>> getEnrolledCourses(@PathVariable("id") Long id) {
        return ResponseEntity.ok(studentService.getEnrolledCourses(id));
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<StudentStatsDTO> getStats(@PathVariable("id") Long id) {
        return ResponseEntity.ok(studentService.getStudentStats(id));
    }

    @GetMapping("/{id}/deadlines")
    public ResponseEntity<List<UpcomingDeadlineDTO>> getDeadlines(@PathVariable("id") Long id) {
        return ResponseEntity.ok(studentService.getUpcomingDeadlines(id));
    }

    @GetMapping("/{id}/notifications")
    public ResponseEntity<List<NotificationDTO>> getNotifications(@PathVariable("id") Long id) {
        return ResponseEntity.ok(studentService.getNotifications(id));
    }
}
