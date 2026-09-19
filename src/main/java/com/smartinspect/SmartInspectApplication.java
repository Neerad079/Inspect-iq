package com.smartinspect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SmartInspectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartInspectApplication.class, args);
	}

}
