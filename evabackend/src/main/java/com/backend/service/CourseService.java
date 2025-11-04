package com.backend.service;

import com.backend.dto.CourseRequest;
import com.backend.dto.CourseResponse;
import com.backend.model.Course;
import com.backend.model.CourseStatus;
import com.backend.model.User;
import com.backend.repository.CourseRepository;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CourseResponse> searchCourses(String searchTerm, CourseStatus status) {
        List<Course> courses;
        if (searchTerm == null && status == null) {
            courses = courseRepository.findAll();
        } else {
            courses = courseRepository.searchCoursesByStatusAndTerm(status, searchTerm);
        }
        return courses.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getPublishedCourses() {
        // The frontend expects '/courses/published' — map that to ACTIVE courses in the current model
        List<Course> courses = courseRepository.findByStatus(CourseStatus.ACTIVE);
        return courses.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getCoursesByInstructor(Long instructorId) {
        List<Course> courses = courseRepository.findByInstructor_Id(instructorId);
        return courses.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CourseResponse getCourseById(@NonNull String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        return mapToResponse(course);
    }

    @Transactional
    public CourseResponse createCourse(@NonNull CourseRequest request) {
        User instructor = userRepository.findById(request.getInstructorId())
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        Course course = new Course();
        course.setId(request.getId());
        course.setTitle(request.getTitle());
        course.setInstructor(instructor);
        course.setStatus(request.getStatus());
        course.setModulesCount(request.getModulesCount());
        course.setAssignmentsCount(request.getAssignmentsCount());

        Course savedCourse = courseRepository.save(course);
        return mapToResponse(savedCourse);
    }

    @Transactional
    public CourseResponse updateCourse(@NonNull String id, @NonNull CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        if (request.getInstructorId() != null) {
            User instructor = userRepository.findById(request.getInstructorId())
                    .orElseThrow(() -> new RuntimeException("Instructor not found"));
            course.setInstructor(instructor);
        }

        if (request.getTitle() != null) {
            course.setTitle(request.getTitle());
        }
        if (request.getStatus() != null) {
            course.setStatus(request.getStatus());
        }
        if (request.getModulesCount() != null) {
            course.setModulesCount(request.getModulesCount());
        }
        if (request.getAssignmentsCount() != null) {
            course.setAssignmentsCount(request.getAssignmentsCount());
        }

        Course updatedCourse = courseRepository.save(course);
        return mapToResponse(updatedCourse);
    }

    @Transactional
    public void deleteCourses(@NonNull List<String> ids) {
        courseRepository.deleteAllById(ids);
    }

    private CourseResponse mapToResponse(Course course) {
        CourseResponse response = new CourseResponse();
        response.setId(course.getId());
        response.setTitle(course.getTitle());
        response.setInstructor(course.getInstructor().getFullName());
        // TODO: Add logic to get instructor avatar
        response.setInstructorAvatar("default-avatar-url");
        response.setStudentsCount(course.getStudents().size());
        response.setStatus(course.getStatus());
        response.setProgress(course.getProgress());
        response.setLastUpdated(course.getUpdatedAt());
        response.setModulesCount(course.getModulesCount());
        response.setAssignmentsCount(course.getAssignmentsCount());
        return response;
    }
}
