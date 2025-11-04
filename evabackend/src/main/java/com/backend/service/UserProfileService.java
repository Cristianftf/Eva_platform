package com.backend.service;

import com.backend.dto.UserProfileDTO;
import com.backend.model.User;
import com.backend.repository.UserRepository;
import com.backend.repository.CourseProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;

@Service
public class UserProfileService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseProgressRepository courseProgressRepository;

    public UserProfileDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UserProfileDTO dto = new UserProfileDTO();
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setBio(user.getBio());
        dto.setStudentId(user.getStudentId());
        dto.setMajor(user.getMajor());
        dto.setYear(user.getYear());
        dto.setGpa(user.getGpa());
        dto.setJoinDate(user.getJoinDate().format(DateTimeFormatter.ISO_DATE));
        dto.setProfileImageUrl(user.getProfileImageUrl());

        // Calcular estadísticas
        Double averageGrade = courseProgressRepository.findAverageGradeByUserId(userId);
        dto.setAverageGrade(averageGrade);
        dto.setTotalCourses(courseProgressRepository.findByUserId(userId).size());
        dto.setOverallProgress("85%"); // Este valor debería calcularse basado en múltiples factores

        return dto;
    }

    public void updateUserProfile(Long userId, UserProfileDTO profileDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setFirstName(profileDTO.getFirstName());
        user.setLastName(profileDTO.getLastName());
        user.setPhone(profileDTO.getPhone());
        user.setBio(profileDTO.getBio());
        user.setMajor(profileDTO.getMajor());
        user.setYear(profileDTO.getYear());

        userRepository.save(user);
    }

    public void updateUserSettings(Long userId, User userSettings) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar preferencias
        user.setLanguage(userSettings.getLanguage());
        user.setTimezone(userSettings.getTimezone());
        user.setTheme(userSettings.getTheme());
        user.setDateFormat(userSettings.getDateFormat());
        user.setTimeFormat(userSettings.getTimeFormat());

        // Actualizar configuración de privacidad
        user.setProfileVisibility(userSettings.getProfileVisibility());
        user.setShowEmail(userSettings.isShowEmail());
        user.setShowPhone(userSettings.isShowPhone());
        user.setShowProgress(userSettings.isShowProgress());
        user.setShowAchievements(userSettings.isShowAchievements());

        // Actualizar configuración de notificaciones
        user.setEmailNotifications(userSettings.isEmailNotifications());
        user.setPushNotifications(userSettings.isPushNotifications());
        user.setCourseUpdates(userSettings.isCourseUpdates());
        user.setAssignmentReminders(userSettings.isAssignmentReminders());
        user.setGradeNotifications(userSettings.isGradeNotifications());
        user.setDiscussionReplies(userSettings.isDiscussionReplies());
        user.setWeeklyReport(userSettings.isWeeklyReport());

        userRepository.save(user);
    }
}