package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UpcomingDeadlineDTO {
    private String courseId;
    private String courseTitle;
    private String title; // e.g., "Assignment 1"
    private LocalDateTime dueDate;
}
