package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentStatsDTO {
    private long enrolledCoursesCount;
    private double averageProgress;
    private long completedCoursesCount;
}
