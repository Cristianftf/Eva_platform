package com.backend.repository;

import com.backend.model.Course;
import com.backend.model.CourseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findByStatus(CourseStatus status);
    
    @Query("SELECT c FROM Course c WHERE " +
        "LOWER(c.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
        "LOWER(c.id) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
        "LOWER(CONCAT(COALESCE(c.instructor.firstName, ''), ' ', COALESCE(c.instructor.lastName, ''))) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Course> searchCourses(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT c FROM Course c WHERE " +
           "(:status IS NULL OR c.status = :status) AND " +
           "(:searchTerm IS NULL OR " +
           "LOWER(c.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.id) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(CONCAT(COALESCE(c.instructor.firstName, ''), ' ', COALESCE(c.instructor.lastName, ''))) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Course> searchCoursesByStatusAndTerm(
        @Param("status") CourseStatus status,
        @Param("searchTerm") String searchTerm
    );
    List<Course> findByStudents_Id(Long studentId);
    
    // Find courses by instructor id
    List<Course> findByInstructor_Id(Long instructorId);
}