package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private CourseModule module;

    @Column(nullable = false)
    private String title;

    @Column(name = "lesson_order", nullable = false)
    private Integer lessonOrder;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LessonType type;

    @Column(nullable = false)
    private Integer duration;

    @Column(name = "is_preview")
    private Boolean isPreview;

    @Column(name = "is_locked")
    private Boolean isLocked;

    @Column(name = "has_notes")
    private Boolean hasNotes;

    @Column(name = "is_completed")
    private Boolean completed;

    @Column(name = "content_url")
    private String contentUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isPreview == null) isPreview = false;
        if (isLocked == null) isLocked = false;
        if (hasNotes == null) hasNotes = false;
        if (completed == null) completed = false;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}