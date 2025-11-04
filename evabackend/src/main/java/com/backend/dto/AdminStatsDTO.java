package com.backend.dto;

import lombok.Data;

@Data
public class AdminStatsDTO {
    private long totalCourses;
    private long totalStudents;
    private double completionRate; // percent
    private int engagementScore; // arbitrary score
}
