package com.backend.repository;

import com.backend.model.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    List<Discussion> findByCourse_IdOrderByCreatedAtDesc(String courseId);
}
