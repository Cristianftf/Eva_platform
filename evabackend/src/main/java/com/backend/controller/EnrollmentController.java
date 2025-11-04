package com.backend.controller;

import com.backend.model.Course;
import com.backend.model.CourseProgress;
import com.backend.model.User;
import com.backend.repository.CourseProgressRepository;
import com.backend.repository.CourseRepository;
import com.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseProgressRepository courseProgressRepository;

    public EnrollmentController(CourseRepository courseRepository, UserRepository userRepository, CourseProgressRepository courseProgressRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.courseProgressRepository = courseProgressRepository;
    }

    @PostMapping
    public ResponseEntity<?> enroll(@RequestBody Map<String, Object> body) {
        try {
            Long userId = body.get("userId") instanceof Number ? ((Number) body.get("userId")).longValue() : Long.parseLong(body.get("userId").toString());
            String courseId = body.get("courseId").toString();

            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));

            course.getStudents().add(user);
            courseRepository.save(course);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{courseId}/progress")
    public ResponseEntity<?> updateProgress(@PathVariable String courseId, @RequestBody Map<String, Object> body) {
        try {
            Long userId = body.get("userId") instanceof Number ? ((Number) body.get("userId")).longValue() : Long.parseLong(body.get("userId").toString());
            Integer progress = body.get("progress") instanceof Number ? ((Number) body.get("progress")).intValue() : Integer.parseInt(body.get("progress").toString());

            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));

            // Try to find an existing CourseProgress for this user and course title
            List<com.backend.model.CourseProgress> existing = courseProgressRepository.findByUserId(userId);
            CourseProgress cp = null;
            for (CourseProgress p : existing) {
                if (p.getCourseName() != null && p.getCourseName().equalsIgnoreCase(course.getTitle())) {
                    cp = p;
                    break;
                }
            }

            if (cp == null) {
                cp = new CourseProgress();
                cp.setUser(user);
                cp.setCourseName(course.getTitle());
            }

            cp.setCompletedPercentage(progress);
            cp.setLastActivity(LocalDate.now());
            courseProgressRepository.save(cp);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
