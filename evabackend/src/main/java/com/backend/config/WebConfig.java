package com.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Value("#{'${spring.security.cors.allowed-origins}'.split(',')}")
    private String[] allowedOrigins;
    
    @Value("#{'${spring.security.cors.allowed-methods}'.split(',')}")
    private String[] allowedMethods;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods(allowedMethods)
                .allowCredentials(true)
                .allowedHeaders("*");
    }
}