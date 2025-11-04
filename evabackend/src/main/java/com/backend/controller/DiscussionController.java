package com.backend.controller;

import com.backend.dto.CreateDiscussionRequest;
import com.backend.dto.CreateReplyRequest;
import com.backend.dto.DiscussionDTO;
import com.backend.service.DiscussionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping("/api/courses/{id}/discussions")
    public ResponseEntity<List<DiscussionDTO>> getDiscussions(@PathVariable("id") String courseId) {
        return ResponseEntity.ok(discussionService.getByCourse(courseId));
    }

    @PostMapping("/api/courses/{id}/discussions")
    public ResponseEntity<DiscussionDTO> createDiscussion(@PathVariable("id") String courseId, @RequestBody CreateDiscussionRequest req) {
        return ResponseEntity.ok(discussionService.createDiscussion(courseId, req));
    }

    @PostMapping("/api/discussions/{id}/replies")
    public ResponseEntity<DiscussionDTO> addReply(@PathVariable("id") Long discussionId, @RequestBody CreateReplyRequest req) {
        return ResponseEntity.ok(discussionService.addReply(discussionId, req));
    }
}
