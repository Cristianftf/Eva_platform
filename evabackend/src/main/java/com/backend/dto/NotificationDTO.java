package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NotificationDTO {
    private String id; // synthetic id
    private String message;
    private LocalDateTime createdAt;
    private String courseId;
}
