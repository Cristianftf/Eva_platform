package com.backend.dto;

import com.backend.model.UserRole;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private UserRole role;
}