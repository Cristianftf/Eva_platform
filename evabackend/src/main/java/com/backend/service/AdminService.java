package com.backend.service;

import com.backend.dto.*;
import com.backend.model.Course;
import com.backend.model.CourseStatus;
import com.backend.model.User;
import com.backend.model.UserRole;
import com.backend.repository.CourseRepository;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public AdminStatsDTO getStats() {
        AdminStatsDTO stats = new AdminStatsDTO();
        long totalCourses = courseRepository.count();
        long totalStudents = userRepository.findAll().stream()
                .filter(u -> u.getRole() == UserRole.ROLE_STUDENT).count();

        // average progress across courses
        List<Course> courses = courseRepository.findAll();
        double avgProgress = 0.0;
        if (!courses.isEmpty()) {
            avgProgress = courses.stream()
                    .filter(c -> c.getProgress() != null)
                    .mapToInt(Course::getProgress)
                    .average().orElse(0.0);
        }

        stats.setTotalCourses(totalCourses);
        stats.setTotalStudents(totalStudents);
        stats.setCompletionRate(Math.round(avgProgress * 100.0) / 100.0);
        stats.setEngagementScore((int) Math.min(100, 50 + totalStudents / 10));

        return stats;
    }

    public List<ActivityDTO> getRecentActivities() {
        // For now return a static list similar to frontend sample
    // DateTimeFormatter fmt = DateTimeFormatter.ISO_LOCAL_DATE_TIME; // not used currently
        List<ActivityDTO> list = new ArrayList<>();

        ActivityDTO a1 = new ActivityDTO();
        a1.setId(1L);
        a1.setType("course_created");
        a1.setTitle("Nuevo curso creado");
        a1.setDescription("Matemáticas Avanzadas - Cálculo Diferencial");
        a1.setUser("Dr. María González");
        a1.setUserAvatar("https://images.unsplash.com/photo-1684262855358-88f296a2cfc2");
        a1.setTimestamp("2025-11-03T16:30:00");
        a1.setIcon("Plus");
        a1.setIconColor("text-success");
        list.add(a1);

        ActivityDTO a2 = new ActivityDTO();
        a2.setId(2L);
        a2.setType("content_uploaded");
        a2.setTitle("Contenido multimedia subido");
        a2.setDescription("15 videos de conferencias añadidos al curso de Física");
        a2.setUser("Prof. Carlos Ruiz");
        a2.setUserAvatar("https://images.unsplash.com/photo-1713946598186-8e28275719b9");
        a2.setTimestamp("2025-11-03T15:45:00");
        a2.setIcon("Upload");
        a2.setIconColor("text-primary");
        list.add(a2);

        // more mock activities
        return list;
    }

    public List<CourseAdminDTO> searchCourses(String search, String status) {
        List<Course> courses;
        CourseStatus cs = null;
        if (status != null && !status.isBlank() && !status.equalsIgnoreCase("all")) {
            try { cs = CourseStatus.valueOf(status.toUpperCase()); } catch (Exception e) { cs = null; }
        }

        if ((search == null || search.isBlank()) && cs == null) {
            courses = courseRepository.findAll();
        } else {
            String term = (search == null || search.isBlank()) ? null : search;
            courses = courseRepository.searchCoursesByStatusAndTerm(cs, term);
        }

        DateTimeFormatter fmt = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return courses.stream().map(c -> {
            CourseAdminDTO dto = new CourseAdminDTO();
            dto.setId(c.getId());
            dto.setTitle(c.getTitle());
            dto.setInstructorName(c.getInstructor() != null ? c.getInstructor().getFullName() : null);
            dto.setInstructorAvatar(null);
            dto.setStudents(c.getStudents() != null ? c.getStudents().size() : 0);
            dto.setStatus(c.getStatus() != null ? c.getStatus().name().toLowerCase() : "");
            dto.setProgress(c.getProgress() != null ? c.getProgress() : 0);
            dto.setModules(c.getModulesCount() != null ? c.getModulesCount() : 0);
            dto.setAssignments(c.getAssignmentsCount() != null ? c.getAssignmentsCount() : 0);
            dto.setLastUpdated(c.getUpdatedAt() != null ? c.getUpdatedAt().format(fmt) : null);
            return dto;
        }).collect(Collectors.toList());
    }

    public List<UserAdminDTO> searchUsers(String search, String role, String status) {
        List<User> users = userRepository.findAll();

        return users.stream().filter(u -> {
            boolean matchesSearch = true;
            if (search != null && !search.isBlank()) {
                String s = search.toLowerCase();
                matchesSearch = (u.getFullName() != null && u.getFullName().toLowerCase().contains(s)) ||
                                (u.getEmail() != null && u.getEmail().toLowerCase().contains(s));
            }
            boolean matchesRole = true;
            if (role != null && !role.equalsIgnoreCase("all")) {
                String normalized = role.toLowerCase();
                if (normalized.equals("professor")) normalized = "role_teacher"; // not exact but we'll compare
                matchesRole = u.getRole() != null && u.getRole().name().toLowerCase().contains(role.toLowerCase());
            }
            return matchesSearch && matchesRole;
        }).map(u -> {
            UserAdminDTO dto = new UserAdminDTO();
            dto.setId(u.getId());
            dto.setName(u.getFullName());
            dto.setEmail(u.getEmail());
            dto.setAvatar(null);
            dto.setRole(u.getRole() != null ? u.getRole().name().replace("ROLE_", "").toLowerCase() : null);
            dto.setStatus("active");
            dto.setLastLogin(null);
            dto.setCoursesCount(null);
            dto.setStudentsCount(null);
            return dto;
        }).collect(Collectors.toList());
    }

    public AnalyticsDTO getAnalytics(String range) {
        AnalyticsDTO dto = new AnalyticsDTO();

        // Mock engagement data
        List<Map<String, Object>> engagement = new ArrayList<>();
        String[] days = new String[]{"Lun","Mar","Mié","Jue","Vie","Sáb","Dom"};
        Random rnd = new Random();
        for (String d : days) {
            Map<String, Object> m = new HashMap<>();
            m.put("day", d);
            m.put("students", 600 + rnd.nextInt(1000));
            m.put("professors", 20 + rnd.nextInt(50));
            m.put("activities", 100 + rnd.nextInt(400));
            engagement.add(m);
        }

        // Mock completion data
        List<Map<String, Object>> completion = new ArrayList<>();
        String[] months = new String[]{"Ene","Feb","Mar","Abr","May","Jun"};
        for (String mth : months) {
            Map<String, Object> m = new HashMap<>();
            m.put("month", mth);
            m.put("completed", 40 + rnd.nextInt(200));
            m.put("enrolled", 100 + rnd.nextInt(300));
            completion.add(m);
        }

        List<Map<String, Object>> device = new ArrayList<>();
        device.add(Map.of("name","Escritorio","value",65,"color","#2563EB"));
        device.add(Map.of("name","Móvil","value",25,"color","#7C3AED"));
        device.add(Map.of("name","Tablet","value",10,"color","#F59E0B"));

        // Top courses from DB
    List<Map<String, Object>> top = courseRepository.findAll().stream()
        .sorted(Comparator.comparingInt((Course c) -> c.getStudents() != null ? c.getStudents().size() : 0).reversed())
        .limit(5)
        .map(c -> {
            Map<String, Object> m = new HashMap<>();
            m.put("id", c.getId());
            m.put("title", c.getTitle());
            m.put("instructor", c.getInstructor() != null ? c.getInstructor().getFullName() : null);
            m.put("students", c.getStudents() != null ? c.getStudents().size() : 0);
            m.put("completion", c.getProgress() != null ? c.getProgress() : 0);
            m.put("rating", 4.5);
            return m;
        }).collect(Collectors.toList());

        dto.setEngagementData(engagement);
        dto.setCompletionData(completion);
        dto.setDeviceUsage(device);
        dto.setTopCourses(top);

        return dto;
    }
}
