package com.backend.service;

import com.backend.dto.CreateDiscussionRequest;
import com.backend.dto.CreateReplyRequest;
import com.backend.dto.DiscussionDTO;
import com.backend.model.Discussion;
import com.backend.model.Reply;
import com.backend.model.User;
import com.backend.repository.DiscussionRepository;
import com.backend.repository.CourseRepository;
import com.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public DiscussionService(DiscussionRepository discussionRepository, UserRepository userRepository, CourseRepository courseRepository) {
        this.discussionRepository = discussionRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public List<DiscussionDTO> getByCourse(String courseId) {
        return discussionRepository.findByCourse_IdOrderByCreatedAtDesc(courseId)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public DiscussionDTO createDiscussion(String courseId, CreateDiscussionRequest req) {
        var courseOpt = courseRepository.findById(courseId);
        if (courseOpt.isEmpty()) throw new IllegalArgumentException("Course not found");

        User author = null;
        if (req.getAuthorId() != null) author = userRepository.findById(req.getAuthorId()).orElse(null);

        Discussion d = new Discussion();
        d.setCourse(courseOpt.get());
        d.setTitle(req.getTitle());
        d.setContent(req.getContent());
        d.setAuthor(author);
        d = discussionRepository.save(d);
        return mapToDto(d);
    }

    public DiscussionDTO addReply(Long discussionId, CreateReplyRequest req) {
        Discussion disc = discussionRepository.findById(discussionId).orElseThrow(() -> new IllegalArgumentException("Discussion not found"));
        User author = null;
        if (req.getAuthorId() != null) author = userRepository.findById(req.getAuthorId()).orElse(null);

        Reply r = new Reply();
        r.setDiscussion(disc);
        r.setContent(req.getContent());
        r.setAuthor(author);
        disc.getReplies().add(r);
        Discussion saved = discussionRepository.save(disc);
        return mapToDto(saved);
    }

    private DiscussionDTO mapToDto(Discussion d) {
        var author = d.getAuthor();
    DiscussionDTO.Author a = new DiscussionDTO.Author(
        author != null && author.getId() != null ? author.getId() : null,
        author != null ? author.getFullName() : "",
        null,
        null,
        author != null && author.getRole() != null ? author.getRole().name() : null
    );

        List<DiscussionDTO.ReplyDTO> replies = d.getReplies().stream().map(r -> {
        var ra = r.getAuthor();
        DiscussionDTO.Author raDto = new DiscussionDTO.Author(
            ra != null && ra.getId() != null ? ra.getId() : null,
            ra != null ? ra.getFullName() : "",
            null,
            null,
            ra != null && ra.getRole() != null ? ra.getRole().name() : null
        );
            return new DiscussionDTO.ReplyDTO(r.getId(), r.getContent(), raDto, r.getCreatedAt(), r.getLikes());
        }).collect(Collectors.toList());

        return new DiscussionDTO(d.getId(), d.getTitle(), d.getContent(), a, d.getCreatedAt(), d.getLikes(), d.getViews(), d.isPinned(), d.isResolved(), replies);
    }
}
