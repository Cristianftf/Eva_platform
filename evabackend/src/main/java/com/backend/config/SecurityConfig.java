package com.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    // private final JwtAuthenticationFilter jwtAuthFilter; // Removed unused field

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // SecurityFilterChain and AuthenticationManager are provided in WebSecurityConfig.
    // This configuration only provides auxiliary beans (e.g. PasswordEncoder).
}