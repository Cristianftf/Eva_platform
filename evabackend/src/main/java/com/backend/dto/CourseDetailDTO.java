package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CourseDetailDTO {
    private String id;
    private String title;
    private String description;
    private String instructorName;
    private String category;
    private String level;
    private String duration;
    private int enrolledStudents;
    private double rating;
    private int reviews;
    private String thumbnail;
    private String thumbnailAlt;
    private LocalDateTime updatedAt;
}
