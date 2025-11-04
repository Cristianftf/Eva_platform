package com.backend.controller;

import com.backend.dto.AssignmentDTO;
import com.backend.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/assignments")
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;

    @GetMapping
    public ResponseEntity<List<AssignmentDTO>> getCourseAssignments(@PathVariable String courseId) {
        return ResponseEntity.ok(assignmentService.getCourseAssignments(courseId));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<AssignmentDTO>> getUpcomingAssignments(@PathVariable String courseId) {
        return ResponseEntity.ok(assignmentService.getUpcomingAssignments(courseId));
    }
}