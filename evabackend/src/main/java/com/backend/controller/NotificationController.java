package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable String id) {
        // Notifications are synthesized in StudentService; marking as read is a no-op for now
        return ResponseEntity.ok(Map.of("id", id, "status", "marked_read"));
    }
}
