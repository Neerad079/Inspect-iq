package com.smartinspect.controller;

import com.smartinspect.dto.response.ApiResponse;
import com.smartinspect.service.EvidenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/evidence")
@RequiredArgsConstructor
public class EvidenceController {

    private final EvidenceService evidenceService;

    @PostMapping
    @PreAuthorize("hasRole('INSPECTOR')")
    public ResponseEntity<ApiResponse> uploadEvidence(
            @RequestParam("file") MultipartFile file,
            @RequestParam("inspectionId") Long inspectionId,
            @RequestParam(value = "latitude", required = false) Double latitude,
            @RequestParam(value = "longitude", required = false) Double longitude,
            @RequestParam(value = "type", defaultValue = "PHOTO") String type) {
        return ResponseEntity.ok(ApiResponse.success("Evidence uploaded successfully",
                evidenceService.uploadEvidence(inspectionId, file, latitude, longitude, type)));
    }

    @GetMapping("/{inspectionId}")
    @PreAuthorize("hasAnyRole('ADMIN','INSPECTOR')")
    public ResponseEntity<ApiResponse> getEvidenceByInspection(@PathVariable Long inspectionId) {
        return ResponseEntity.ok(ApiResponse.success("Evidence retrieved successfully",
                evidenceService.getEvidenceByInspection(inspectionId)));
    }
}
