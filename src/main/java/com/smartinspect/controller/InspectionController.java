package com.smartinspect.controller;

import com.smartinspect.dto.request.InspectionSubmitRequest;
import com.smartinspect.dto.response.ApiResponse;
import com.smartinspect.service.InspectionService;
import com.smartinspect.service.SurpriseInspectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inspections")
@RequiredArgsConstructor
public class InspectionController {

    private final InspectionService inspectionService;
    private final SurpriseInspectionService surpriseInspectionService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAllInspections() {
        return ResponseEntity.ok(ApiResponse.success("Inspections retrieved successfully",
                inspectionService.getAllInspections()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','INSPECTOR')")
    public ResponseEntity<ApiResponse> getInspectionById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Inspection retrieved successfully",
                inspectionService.getInspectionById(id)));
    }

    @GetMapping("/inspector/{inspectorId}")
    @PreAuthorize("hasAnyRole('ADMIN','INSPECTOR')")
    public ResponseEntity<ApiResponse> getInspectionsByInspector(@PathVariable Long inspectorId) {
        return ResponseEntity.ok(ApiResponse.success("Inspector inspections retrieved successfully",
                inspectionService.getInspectionsByInspector(inspectorId)));
    }

    @PostMapping("/surprise")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> triggerSurpriseInspection() {
        return ResponseEntity.ok(ApiResponse.success("Surprise inspection created successfully",
                surpriseInspectionService.triggerSurpriseInspection()));
    }

    @PostMapping("/{id}/submit")
    @PreAuthorize("hasRole('INSPECTOR')")
    public ResponseEntity<ApiResponse> submitInspection(@PathVariable Long id,
                                                         @Valid @RequestBody InspectionSubmitRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Inspection submitted successfully",
                inspectionService.submitInspection(id, request)));
    }
}
