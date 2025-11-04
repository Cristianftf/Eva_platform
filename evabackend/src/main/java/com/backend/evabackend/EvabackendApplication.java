package com.backend.evabackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = "com.backend")
@EnableJpaRepositories(basePackages = "com.backend.repository")
@EntityScan(basePackages = "com.backend.model")
public class EvabackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EvabackendApplication.class, args);
	}

}
