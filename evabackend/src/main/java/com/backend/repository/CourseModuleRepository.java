package com.backend.repository;

import com.backend.model.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CourseModuleRepository extends JpaRepository<CourseModule, Long> {
    List<CourseModule> findByCourseIdOrderByOrderAsc(String courseId);

    @Query("SELECT m FROM CourseModule m LEFT JOIN FETCH m.lessons WHERE m.course.id = :courseId ORDER BY m.order ASC")
    List<CourseModule> findByCourseIdWithLessons(@Param("courseId") String courseId);
}