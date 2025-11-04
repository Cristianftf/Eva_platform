package com.backend.controller;

import com.backend.dto.UpdateProfileRequest;
import com.backend.dto.UserResponse;
import com.backend.model.User;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserResponse> getProfile(@PathVariable long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();
        UserResponse resp = mapToResponse(user);
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<UserResponse> updateProfile(@PathVariable long id, @RequestBody UpdateProfileRequest req) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();
        if (req.getFullName() != null && !req.getFullName().isBlank()) {
            user.setFullName(req.getFullName());
        }
        if (req.getPassword() != null && !req.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(req.getPassword()));
        }

        User saved = userRepository.save(user);
        return ResponseEntity.ok(mapToResponse(saved));
    }

    private UserResponse mapToResponse(User user) {
        UserResponse resp = new UserResponse();
        resp.setId(user.getId());
        resp.setEmail(user.getEmail());
        resp.setFullName(user.getFullName());
        resp.setRole(user.getRole());
        return resp;
    }
}
