package com.backend.dto;

import lombok.Data;

@Data
public class CreateDiscussionRequest {
    private String title;
    private String content;
    private Long authorId;
}
