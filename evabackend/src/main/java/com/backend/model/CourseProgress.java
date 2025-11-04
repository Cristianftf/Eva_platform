package com.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "course_progress")
public class CourseProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String courseName;
    private Integer completedPercentage;
    private Integer totalUnits;
    private Double grade;
    private LocalDate lastActivity;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Integer getCompletedPercentage() {
        return completedPercentage;
    }

    public void setCompletedPercentage(Integer completedPercentage) {
        this.completedPercentage = completedPercentage;
    }

    public Integer getTotalUnits() {
        return totalUnits;
    }

    public void setTotalUnits(Integer totalUnits) {
        this.totalUnits = totalUnits;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public LocalDate getLastActivity() {
        return lastActivity;
    }

    public void setLastActivity(LocalDate lastActivity) {
        this.lastActivity = lastActivity;
    }
}