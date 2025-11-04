package com.backend.dto;

import com.backend.model.CourseStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CourseResponse {
    private String id;
    private String title;
    private String instructor;
    private String instructorAvatar;
    private Integer studentsCount;
    private CourseStatus status;
    private Integer progress;
    private LocalDateTime lastUpdated;
    private Integer modulesCount;
    private Integer assignmentsCount;
}