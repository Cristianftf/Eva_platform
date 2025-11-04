package com.backend.controller;

import com.backend.dto.StudyActivityDTO;
import com.backend.service.StudyActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/study-activity")
@CrossOrigin(origins = "*")
public class StudyActivityController {
    @Autowired
    private StudyActivityService studyActivityService;

    @GetMapping("/user/{userId}/weekly")
    public ResponseEntity<List<StudyActivityDTO>> getWeeklyStudyActivity(@PathVariable Long userId) {
        List<StudyActivityDTO> activities = studyActivityService.getWeeklyStudyActivity(userId);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/user/{userId}/patterns")
    public ResponseEntity<Map<String, Integer>> getStudyPatterns(@PathVariable Long userId) {
        Map<String, Integer> patterns = studyActivityService.getStudyPatterns(userId);
        return ResponseEntity.ok(patterns);
    }

    @PostMapping("/user/{userId}/record")
    public ResponseEntity<StudyActivityDTO> recordStudyActivity(
            @PathVariable Long userId,
            @RequestBody StudyActivityDTO activityDTO) {
        StudyActivityDTO recordedActivity = studyActivityService.recordStudyActivity(userId, activityDTO);
        return ResponseEntity.ok(recordedActivity);
    }
}