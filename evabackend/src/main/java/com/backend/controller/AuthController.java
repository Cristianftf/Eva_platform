package com.backend.controller;

import com.backend.dto.AuthResponse;
import com.backend.dto.LoginRequest;
import com.backend.dto.RegisterRequest;
import com.backend.service.AuthService;
import com.backend.security.JwtService;
import com.backend.repository.UserRepository;
import com.backend.dto.UserResponse;
import com.backend.model.User;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String token) {
        // Por ahora, solo retornamos OK ya que la invalidación del token se maneja en el cliente
        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate")
    public ResponseEntity<AuthResponse> validateToken(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }
        String jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        if (email == null) return ResponseEntity.status(401).build();

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).build();

        User user = userOpt.get();
        UserResponse userResp = new UserResponse();
        userResp.setId(user.getId());
        userResp.setEmail(user.getEmail());
        userResp.setFullName(user.getFullName());
        userResp.setRole(user.getRole());

        AuthResponse resp = new AuthResponse(jwt, userResp);
        return ResponseEntity.ok(resp);
    }
}