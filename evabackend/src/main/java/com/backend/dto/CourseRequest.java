package com.backend.dto;

import com.backend.model.CourseStatus;
import lombok.Data;

@Data
public class CourseRequest {
    private String id;
    private String title;
    private Long instructorId;
    private CourseStatus status;
    private Integer modulesCount;
    private Integer assignmentsCount;
}