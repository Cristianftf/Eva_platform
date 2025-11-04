package com.backend.dto;

import lombok.Data;

@Data
public class CourseAdminDTO {
    private String id;
    private String title;
    private String instructorName;
    private String instructorAvatar;
    private int students;
    private String status;
    private int progress;
    private int modules;
    private int assignments;
    private String lastUpdated;
}
