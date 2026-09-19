package com.smartinspect.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private Boolean success;
    private String message;
    private Object data;
    private LocalDateTime timestamp;

    public static ApiResponse success(String message, Object data) {
        return ApiResponse.builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static ApiResponse success(Object data) {
        return ApiResponse.builder()
                .success(true)
                .message("Success")
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static ApiResponse error(String message) {
        return ApiResponse.builder()
                .success(false)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
