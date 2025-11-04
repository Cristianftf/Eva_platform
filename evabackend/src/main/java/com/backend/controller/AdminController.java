package com.backend.controller;

import com.backend.dto.*;
import com.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    @GetMapping("/recent-activity")
    public ResponseEntity<List<ActivityDTO>> getRecentActivity() {
        return ResponseEntity.ok(adminService.getRecentActivities());
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseAdminDTO>> getCourses(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(adminService.searchCourses(search, status));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserAdminDTO>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(adminService.searchUsers(search, role, status));
    }

    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsDTO> getAnalytics(@RequestParam(required = false) String range) {
        return ResponseEntity.ok(adminService.getAnalytics(range));
    }
}
