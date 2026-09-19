package com.smartinspect.controller;

import com.smartinspect.dto.response.ApiResponse;
import com.smartinspect.service.InspectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inspectors")
@RequiredArgsConstructor
public class InspectorController {

    private final InspectorService inspectorService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAllInspectors() {
        return ResponseEntity.ok(ApiResponse.success("Inspectors retrieved successfully",
                inspectorService.getAllInspectors()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getInspectorById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Inspector retrieved successfully",
                inspectorService.getInspectorById(id)));
    }
}
