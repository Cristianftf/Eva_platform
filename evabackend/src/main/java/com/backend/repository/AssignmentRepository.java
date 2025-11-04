package com.backend.repository;

import com.backend.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourseId(String courseId);
    
    @Query("SELECT a FROM Assignment a WHERE a.course.id = ?1 ORDER BY a.dueDate ASC")
    List<Assignment> findUpcomingAssignmentsByCourseId(String courseId);
}