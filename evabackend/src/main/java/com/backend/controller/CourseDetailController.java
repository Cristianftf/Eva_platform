package com.backend.controller;

import com.backend.dto.*;
import com.backend.service.CourseDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CourseDetailController {

    private final CourseDetailService courseDetailService;

    public CourseDetailController(CourseDetailService courseDetailService) {
        this.courseDetailService = courseDetailService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDetailDTO> getCourse(@PathVariable("id") String id) {
        return courseDetailService.getCourseDetail(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
