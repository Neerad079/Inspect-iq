package com.smartinspect.service;

import com.smartinspect.dto.request.AttendanceRequest;
import com.smartinspect.exception.ResourceNotFoundException;
import com.smartinspect.model.Attendance;
import com.smartinspect.model.Institution;
import com.smartinspect.repository.AttendanceRepository;
import com.smartinspect.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final InstitutionRepository institutionRepository;

    public Attendance recordAttendance(AttendanceRequest req) {
        Institution institution = institutionRepository.findById(req.getInstitutionId())
                .orElseThrow(() -> new ResourceNotFoundException("Institution not found with id: " + req.getInstitutionId()));

        Attendance attendance = Attendance.builder()
                .institution(institution)
                .date(req.getDate())
                .presentCount(req.getPresentCount())
                .absentCount(req.getAbsentCount())
                .totalCount(req.getTotalCount())
                .build();

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByInstitution(Long institutionId) {
        return attendanceRepository.findByInstitutionIdOrderByDateDesc(institutionId);
    }

    public List<Attendance> getAttendanceByDateRange(Long institutionId, LocalDate start, LocalDate end) {
        return attendanceRepository.findByInstitutionIdAndDateBetween(institutionId, start, end);
    }
}
