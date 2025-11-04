package com.backend.service;

import com.backend.dto.*;
import com.backend.model.Course;
import com.backend.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final CourseRepository courseRepository;

    public StudentService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<EnrolledCourseDTO> getEnrolledCourses(Long studentId) {
        List<Course> courses = courseRepository.findByStudents_Id(studentId);
        return courses.stream().map(c -> new EnrolledCourseDTO(
                c.getId(),
                c.getTitle(),
                c.getInstructor() != null ? c.getInstructor().getFullName() : "-",
                c.getModulesCount(),
                c.getAssignmentsCount(),
                c.getProgress(),
                c.getStudents() != null ? c.getStudents().size() : 0,
                c.getUpdatedAt()
        )).collect(Collectors.toList());
    }

    public StudentStatsDTO getStudentStats(Long studentId) {
        List<Course> courses = courseRepository.findByStudents_Id(studentId);
        long enrolled = courses.size();
        double avgProgress = courses.stream()
                .map(Course::getProgress)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .average().orElse(0.0);
        long completed = courses.stream().filter(c -> c.getProgress() != null && c.getProgress() >= 100).count();
        return new StudentStatsDTO(enrolled, avgProgress, completed);
    }

    public List<UpcomingDeadlineDTO> getUpcomingDeadlines(Long studentId) {
        // No assignment entity present; synthesize upcoming deadlines based on updatedAt + assignmentsCount
        List<Course> courses = courseRepository.findByStudents_Id(studentId);
        List<UpcomingDeadlineDTO> deadlines = new ArrayList<>();
        for (Course c : courses) {
            int assignments = c.getAssignmentsCount() != null ? c.getAssignmentsCount() : 0;
            for (int i = 1; i <= Math.min(assignments, 3); i++) {
                deadlines.add(new UpcomingDeadlineDTO(
                        c.getId(),
                        c.getTitle(),
                        "Assignment " + i,
                        c.getUpdatedAt() != null ? c.getUpdatedAt().plusDays(i * 7L) : LocalDateTime.now().plusDays(i * 7L)
                ));
            }
        }
        // sort by dueDate
        deadlines.sort(Comparator.comparing(UpcomingDeadlineDTO::getDueDate));
        return deadlines.stream().limit(10).collect(Collectors.toList());
    }

    public List<NotificationDTO> getNotifications(Long studentId) {
        // Synthesize notifications from recent course updates and course progress
        List<Course> courses = courseRepository.findByStudents_Id(studentId);
        List<NotificationDTO> notes = new ArrayList<>();
        for (Course c : courses) {
            notes.add(new NotificationDTO(
                    UUID.randomUUID().toString(),
                    "New content in " + c.getTitle(),
                    c.getUpdatedAt() != null ? c.getUpdatedAt() : LocalDateTime.now(),
                    c.getId()
            ));
            if (c.getProgress() != null && c.getProgress() < 50) {
                notes.add(new NotificationDTO(
                        UUID.randomUUID().toString(),
                        "You're at " + c.getProgress() + "% in " + c.getTitle() + ". Keep going!",
                        c.getUpdatedAt() != null ? c.getUpdatedAt().plusDays(1) : LocalDateTime.now().plusDays(1),
                        c.getId()
                ));
            }
        }
        notes.sort(Comparator.comparing(NotificationDTO::getCreatedAt).reversed());
        return notes.stream().limit(20).collect(Collectors.toList());
    }
}
