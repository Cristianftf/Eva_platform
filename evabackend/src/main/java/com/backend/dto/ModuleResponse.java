package com.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ModuleResponse {
    private Long id;
    private String title;
    private Integer order;
    private List<LessonResponse> lessons;
    private Integer totalDuration;
    private Integer completedLessons;
    private Boolean completed;
}