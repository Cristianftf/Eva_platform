package com.backend.dto;

import lombok.Data;

@Data
public class CreateReplyRequest {
    private Long authorId;
    private String content;
}
