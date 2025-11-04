package com.backend.controller;

import com.backend.dto.GoalDTO;
import com.backend.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "*")
public class GoalController {
    @Autowired
    private GoalService goalService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GoalDTO>> getUserGoals(@PathVariable Long userId) {
        List<GoalDTO> goals = goalService.getUserGoals(userId);
        return ResponseEntity.ok(goals);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<GoalDTO> createGoal(
            @PathVariable Long userId,
            @RequestBody GoalDTO goalDTO) {
        GoalDTO createdGoal = goalService.createGoal(userId, goalDTO);
        return ResponseEntity.ok(createdGoal);
    }

    @PutMapping("/{goalId}/progress")
    public ResponseEntity<GoalDTO> updateGoalProgress(
            @PathVariable Long goalId,
            @RequestParam Double currentValue) {
        GoalDTO updatedGoal = goalService.updateGoalProgress(goalId, currentValue);
        return ResponseEntity.ok(updatedGoal);
    }
}