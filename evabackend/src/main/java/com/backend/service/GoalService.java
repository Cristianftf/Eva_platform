package com.backend.service;

import com.backend.dto.GoalDTO;
import com.backend.model.Goal;
import com.backend.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoalService {
    @Autowired
    private GoalRepository goalRepository;

    public List<GoalDTO> getUserGoals(Long userId) {
        List<Goal> goals = goalRepository.findByUserId(userId);
        return goals.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public GoalDTO createGoal(Long userId, GoalDTO goalDTO) {
        Goal goal = new Goal();
        updateGoalFromDTO(goal, goalDTO);
        goal.setStatus("in_progress");
        goal = goalRepository.save(goal);
        return convertToDTO(goal);
    }

    public GoalDTO updateGoalProgress(Long goalId, Double currentValue) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Objetivo no encontrado"));

        goal.setCurrentValue(currentValue);
        
        // Calcular el progreso en porcentaje
        double progress = (currentValue / goal.getTargetValue()) * 100;
        goal.setProgress((int) progress);

        // Actualizar el estado si se completó
        if (progress >= 100) {
            goal.setStatus("completed");
        }

        goal = goalRepository.save(goal);
        return convertToDTO(goal);
    }

    private GoalDTO convertToDTO(Goal goal) {
        GoalDTO dto = new GoalDTO();
        dto.setId(goal.getId());
        dto.setTitle(goal.getTitle());
        dto.setDescription(goal.getDescription());
        dto.setCategory(goal.getCategory());
        dto.setTargetValue(goal.getTargetValue());
        dto.setCurrentValue(goal.getCurrentValue());
        dto.setUnit(goal.getUnit());
        dto.setTargetDate(goal.getTargetDate().format(DateTimeFormatter.ISO_DATE));
        dto.setProgress(goal.getProgress());
        dto.setStatus(goal.getStatus());
        dto.setIcon(goal.getIcon());
        dto.setColor(goal.getColor());
        dto.setBgColor(goal.getBgColor());
        dto.setBorderColor(goal.getBorderColor());
        dto.setCategoryLabel(goal.getCategoryLabel());
        return dto;
    }

    private void updateGoalFromDTO(Goal goal, GoalDTO dto) {
        goal.setTitle(dto.getTitle());
        goal.setDescription(dto.getDescription());
        goal.setCategory(dto.getCategory());
        goal.setTargetValue(dto.getTargetValue());
        goal.setCurrentValue(dto.getCurrentValue());
        goal.setUnit(dto.getUnit());
        goal.setTargetDate(LocalDate.parse(dto.getTargetDate()));
        goal.setProgress(dto.getProgress());
        goal.setIcon(dto.getIcon());
        goal.setColor(dto.getColor());
        goal.setBgColor(dto.getBgColor());
        goal.setBorderColor(dto.getBorderColor());
        goal.setCategoryLabel(dto.getCategoryLabel());
    }
}