package com.backend.dto;

import lombok.Data;

@Data
public class ActivityDTO {
    private Long id;
    private String type;
    private String title;
    private String description;
    private String user;
    private String userAvatar;
    private String timestamp;
    private String icon;
    private String iconColor;
}
