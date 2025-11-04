package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LessonDTO {
    private Long id;
    private String title;
    private String type; // video, assignment, quiz
    private int duration; // minutes
    private boolean completed;
    private boolean isPreview;
    private boolean isLocked;
    private boolean hasNotes;
}
