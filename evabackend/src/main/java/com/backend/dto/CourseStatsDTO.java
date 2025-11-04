package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseStatsDTO {
    private int overallAverage;
    private int highestGrade;
    private String highestGradeAssignment;
    private int completedAssignments;
    private int totalAssignments;
    private int classRank;
    private int totalStudents;
}
