package com.smartinspect.controller;

import com.smartinspect.dto.response.ApiResponse;
import com.smartinspect.service.AIIntegrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIIntegrationService aiIntegrationService;

    @PostMapping("/analyze/{institutionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> triggerAnalysis(@PathVariable Long institutionId) {
        return ResponseEntity.ok(ApiResponse.success("AI analysis completed successfully",
                aiIntegrationService.analyzeInstitution(institutionId)));
    }

    @GetMapping("/predictions/{institutionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getPredictions(@PathVariable Long institutionId) {
        return ResponseEntity.ok(ApiResponse.success("AI predictions retrieved successfully",
                aiIntegrationService.getPredictions(institutionId)));
    }
}
