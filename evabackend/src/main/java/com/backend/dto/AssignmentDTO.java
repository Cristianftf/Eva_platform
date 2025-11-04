package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class AssignmentDTO {
    private Long id;
    private String title;
    private String description;
    private String shortDescription;
    private String fullDescription;
    private LocalDateTime dueDate;
    private Integer maxPoints;
    private String status; // pending, completed, submitted
    private List<String> requirements;
    private List<RubricItem> rubric;
    
    // Additional fields for statistics and tracking
    private String courseId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Double averageScore;
    private Integer submissionCount;
    private Integer pendingGradeCount;
    
    public AssignmentDTO(Long id, String title, String shortDescription, String fullDescription,
                        LocalDateTime dueDate, Integer maxPoints, String status,
                        List<String> requirements, List<RubricItem> rubric) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.dueDate = dueDate;
        this.maxPoints = maxPoints;
        this.status = status;
        this.requirements = requirements;
        this.rubric = rubric;
    }

    @Data
    @AllArgsConstructor
    public static class RubricItem {
        private String name;
        private int points;
    }
}
