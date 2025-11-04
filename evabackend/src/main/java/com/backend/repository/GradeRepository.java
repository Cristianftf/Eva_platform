package com.backend.repository;

import com.backend.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudent_IdAndAssignment_Course_Id(Long studentId, String courseId);
    
    List<Grade> findByAssignment_Id(Long assignmentId);
    
    @Query("SELECT AVG(g.score) FROM Grade g WHERE g.student.id = ?1 AND g.assignment.course.id = ?2")
    Double calculateAverageGrade(Long studentId, String courseId);
    
    @Query("SELECT g FROM Grade g WHERE g.assignment.course.id = ?1 ORDER BY g.updatedAt DESC")
    List<Grade> findRecentGradesByCourseId(String courseId);
}