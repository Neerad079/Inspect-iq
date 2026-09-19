package com.smartinspect.controller;

import com.smartinspect.dto.request.InstitutionRequest;
import com.smartinspect.dto.response.ApiResponse;
import com.smartinspect.model.enums.InstitutionStatus;
import com.smartinspect.service.InstitutionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/institutions")
@RequiredArgsConstructor
public class InstitutionController {

    private final InstitutionService institutionService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAllInstitutions(@RequestParam(required = false) String status) {
        if (status != null && !status.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.success("Institutions retrieved successfully",
                    institutionService.getInstitutionsByStatus(InstitutionStatus.valueOf(status.toUpperCase()))));
        }
        return ResponseEntity.ok(ApiResponse.success("Institutions retrieved successfully",
                institutionService.getAllInstitutions()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getInstitutionById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Institution retrieved successfully",
                institutionService.getInstitutionById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createInstitution(@Valid @RequestBody InstitutionRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Institution created successfully",
                institutionService.createInstitution(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateInstitution(@PathVariable Long id,
                                                          @Valid @RequestBody InstitutionRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Institution updated successfully",
                institutionService.updateInstitution(id, request)));
    }
}
