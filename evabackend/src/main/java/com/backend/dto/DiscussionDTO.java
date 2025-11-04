package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class DiscussionDTO {
    private Long id;
    private String title;
    private String content;
    private Author author;
    private LocalDateTime createdAt;
    private int likes;
    private int views;
    private boolean isPinned;
    private boolean isResolved;
    private List<ReplyDTO> replies;

    @Data
    @AllArgsConstructor
    public static class Author {
        private Long id;
        private String name;
        private String avatar;
        private String avatarAlt;
        private String role;
    }

    @Data
    @AllArgsConstructor
    public static class ReplyDTO {
        private Long id;
        private String content;
        private Author author;
        private LocalDateTime createdAt;
        private int likes;
    }
}
