package com.backend.controller;

import com.backend.dto.ActivityDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/activities")
public class ActivitiesController {

    @PostMapping
    public ResponseEntity<?> addActivity(@RequestBody Map<String, Object> body) {
        // Minimal implementation: echo back a synthesized ActivityDTO
        ActivityDTO dto = new ActivityDTO();
        dto.setId(System.currentTimeMillis());
        dto.setType((String) body.getOrDefault("type", "activity"));
        dto.setTitle((String) body.getOrDefault("action", "action"));
        dto.setDescription((String) body.getOrDefault("target", ""));
        dto.setUser((String) body.getOrDefault("user", "system"));
        dto.setTimestamp(java.time.Instant.now().toString());
        return ResponseEntity.ok(dto);
    }
}
