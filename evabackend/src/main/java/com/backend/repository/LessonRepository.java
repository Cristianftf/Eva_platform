package com.backend.repository;

import com.backend.model.Lesson;
import com.backend.model.LessonType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByModuleIdOrderByLessonOrderAsc(Long moduleId);
    List<Lesson> findByModuleIdAndType(Long moduleId, LessonType type);
}