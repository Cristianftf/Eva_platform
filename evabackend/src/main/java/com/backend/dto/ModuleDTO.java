package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ModuleDTO {
    private Long id;
    private String title;
    private boolean completed;
    private int totalDuration; // in minutes
    private int completedLessons;
    private List<LessonDTO> lessons;
}
