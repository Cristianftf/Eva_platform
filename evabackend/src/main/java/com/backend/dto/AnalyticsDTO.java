package com.backend.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class AnalyticsDTO {
    private List<Map<String, Object>> engagementData;
    private List<Map<String, Object>> completionData;
    private List<Map<String, Object>> deviceUsage;
    private List<Map<String, Object>> topCourses;
}
