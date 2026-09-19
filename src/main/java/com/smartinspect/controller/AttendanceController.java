package com.smartinspect.controller;

import com.smartinspect.dto.request.AttendanceRequest;
import com.smartinspect.dto.response.ApiResponse;
import com.smartinspect.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> recordAttendance(@Valid @RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Attendance recorded successfully",
                attendanceService.recordAttendance(request)));
    }

    @GetMapping("/{institutionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAttendanceByInstitution(@PathVariable Long institutionId) {
        return ResponseEntity.ok(ApiResponse.success("Attendance retrieved successfully",
                attendanceService.getAttendanceByInstitution(institutionId)));
    }
}
