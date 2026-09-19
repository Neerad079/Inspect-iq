package com.smartinspect.service;

import com.smartinspect.dto.request.InspectionSubmitRequest;
import com.smartinspect.exception.ResourceNotFoundException;
import com.smartinspect.model.Inspection;
import com.smartinspect.model.Inspector;
import com.smartinspect.model.enums.InspectionStatus;
import com.smartinspect.repository.InspectionRepository;
import com.smartinspect.repository.InspectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InspectionService {

    private final InspectionRepository inspectionRepository;
    private final InspectorRepository inspectorRepository;

    @Cacheable("inspections")
    public List<Inspection> getAllInspections() {
        return inspectionRepository.findAll();
    }

    public Inspection getInspectionById(Long id) {
        return inspectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inspection not found with id: " + id));
    }

    public List<Inspection> getInspectionsByInspector(Long inspectorId) {
        return inspectionRepository.findByInspectorId(inspectorId);
    }

    public List<Inspection> getInspectionsByInstitution(Long institutionId) {
        return inspectionRepository.findByInstitutionId(institutionId);
    }

    @Transactional
    @CacheEvict(value = "inspections", allEntries = true)
    public Inspection submitInspection(Long id, InspectionSubmitRequest req) {
        Inspection inspection = getInspectionById(id);
        
        inspection.setStatus(InspectionStatus.COMPLETED);
        inspection.setCompletedAt(LocalDateTime.now());
        inspection.setRemarks(req.getRemarks());
        inspection.setChecklistJson(req.getChecklistJson());

        Inspector inspector = inspection.getInspector();
        if (inspector.getCurrentWorkload() > 0) {
            inspector.setCurrentWorkload(inspector.getCurrentWorkload() - 1);
            inspectorRepository.save(inspector);
        }

        return inspectionRepository.save(inspection);
    }
}
