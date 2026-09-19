package com.smartinspect.controller;

import com.smartinspect.dto.response.ApiResponse;
import com.smartinspect.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> listAlerts() {
        return ResponseEntity.ok(ApiResponse.success("Alerts retrieved successfully", alertService.getAllAlerts()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAlert(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Alert retrieved successfully", alertService.getAlertById(id)));
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> markAlertAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Alert marked as read", alertService.markAsRead(id)));
    }
}
