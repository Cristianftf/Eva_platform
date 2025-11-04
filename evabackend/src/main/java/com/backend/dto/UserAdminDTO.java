package com.backend.dto;

import lombok.Data;

@Data
public class UserAdminDTO {
    private Long id;
    private String name;
    private String email;
    private String avatar;
    private String role;
    private String status;
    private String lastLogin;
    private Integer coursesCount;
    private Integer studentsCount;
}
