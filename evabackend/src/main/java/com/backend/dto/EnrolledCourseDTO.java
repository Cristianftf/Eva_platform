package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EnrolledCourseDTO {
    private String id;
    private String title;
    private String instructorName;
    private Integer modulesCount;
    private Integer assignmentsCount;
    private Integer progress; // 0-100
    private Integer studentsCount;
    private LocalDateTime updatedAt;
}
