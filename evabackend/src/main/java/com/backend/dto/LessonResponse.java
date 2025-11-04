package com.backend.dto;

import com.backend.model.LessonType;
import lombok.Data;

@Data
public class LessonResponse {
    private Long id;
    private String title;
    private LessonType type;
    private Integer duration;
    private Boolean isPreview;
    private Boolean isLocked;
    private Boolean hasNotes;
    private Boolean completed;
    private String contentUrl;
}