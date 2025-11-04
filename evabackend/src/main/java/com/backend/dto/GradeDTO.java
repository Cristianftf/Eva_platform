package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class GradeDTO {
    private Long id;
    private Long studentId;
    private String studentName;
    private Long assignmentId;
    private String assignmentTitle;
    private String title;
    private String category;
    private Double score;
    private Integer maxScore;
    private Integer percentage;
    private LocalDateTime submittedAt;
    private LocalDateTime gradedAt;
    private Boolean submittedOnTime;
    private String feedback;
    private List<Breakdown> breakdown;
    
    public GradeDTO(Long id, String title, String category, Double score, Integer maxScore,
                    Integer percentage, LocalDateTime submittedAt, Boolean submittedOnTime,
                    String feedback, List<Breakdown> breakdown) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.score = score;
        this.maxScore = maxScore;
        this.percentage = percentage;
        this.submittedAt = submittedAt;
        this.submittedOnTime = submittedOnTime;
        this.feedback = feedback;
        this.breakdown = breakdown;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Breakdown {
        private String criterion;
        private Integer score;
        private Integer maxScore;
    }
}
