package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String phone;
    private String bio;

    @Column(name = "student_id")
    private String studentId;

    private String major;
    private Integer year;
    private Double gpa;

    @Column(name = "join_date")
    private LocalDateTime joinDate;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    // Preferencias
    private String language;
    private String timezone;
    private String theme;

    @Column(name = "date_format")
    private String dateFormat;

    @Column(name = "time_format")
    private String timeFormat;

    // Configuración de privacidad
    @Column(name = "profile_visibility")
    private String profileVisibility;

    @Column(name = "show_email")
    private boolean showEmail;

    @Column(name = "show_phone")
    private boolean showPhone;

    @Column(name = "show_progress")
    private boolean showProgress;

    @Column(name = "show_achievements")
    private boolean showAchievements;

    // Configuración de notificaciones
    @Column(name = "email_notifications")
    private boolean emailNotifications;

    @Column(name = "push_notifications")
    private boolean pushNotifications;

    @Column(name = "course_updates")
    private boolean courseUpdates;

    @Column(name = "assignment_reminders")
    private boolean assignmentReminders;

    @Column(name = "grade_notifications")
    private boolean gradeNotifications;

    @Column(name = "discussion_replies")
    private boolean discussionReplies;

    @Column(name = "weekly_report")
    private boolean weeklyReport;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public String getFullName() {
        if (firstName == null && lastName == null) {
            return "";
        }
        if (firstName == null) {
            return lastName;
        }
        if (lastName == null) {
            return firstName;
        }
        return firstName + " " + lastName;
    }

    public void setFullName(String fullName) {
        if (fullName == null || fullName.trim().isEmpty()) {
            this.firstName = null;
            this.lastName = null;
            return;
        }
        String[] parts = fullName.trim().split("\\s+", 2);
        this.firstName = parts[0];
        this.lastName = parts.length > 1 ? parts[1] : null;
    }
}