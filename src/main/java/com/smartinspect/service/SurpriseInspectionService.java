package com.smartinspect.service;

import com.smartinspect.dto.response.SurpriseInspectionResponse;
import com.smartinspect.model.Inspection;
import com.smartinspect.model.Inspector;
import com.smartinspect.model.Institution;
import com.smartinspect.model.enums.InspectionStatus;
import com.smartinspect.model.enums.InstitutionStatus;
import com.smartinspect.repository.InspectionRepository;
import com.smartinspect.repository.InspectorRepository;
import com.smartinspect.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SurpriseInspectionService {

    private final InstitutionRepository institutionRepository;
    private final InspectorRepository inspectorRepository;
    private final InspectionRepository inspectionRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    @Transactional
    @CacheEvict(value = {"inspections", "institutions"}, allEntries = true)
    public SurpriseInspectionResponse triggerSurpriseInspection() {
        // Step 1: Get eligible institutions (ACTIVE status)
        List<Institution> activeInstitutions = institutionRepository.findByStatus(InstitutionStatus.ACTIVE);
        if (activeInstitutions.isEmpty()) {
            throw new RuntimeException("No eligible institutions found for surprise inspection");
        }

        // Step 2: Randomly select one institution
        Institution randomInstitution = activeInstitutions.get(secureRandom.nextInt(activeInstitutions.size()));

        // Step 3: Get available inspectors (workload < 5)
        List<Inspector> availableInspectors = inspectorRepository.findByAvailabilityTrueAndCurrentWorkloadLessThan(5);
        if (availableInspectors.isEmpty()) {
            throw new RuntimeException("No available inspectors for surprise inspection");
        }

        // Step 4: Randomly select one inspector
        Inspector randomInspector = availableInspectors.get(secureRandom.nextInt(availableInspectors.size()));

        // Step 5: Generate inspection code
        long count = inspectionRepository.count();
        String inspectionCode = "INS-" + (1000 + count);

        // Step 6: Create inspection record
        Inspection inspection = Inspection.builder()
                .inspectionCode(inspectionCode)
                .institution(randomInstitution)
                .inspector(randomInspector)
                .status(InspectionStatus.ASSIGNED)
                .assignedAt(LocalDateTime.now())
                .build();

        Inspection savedInspection = inspectionRepository.save(inspection);

        // Step 7: Increment inspector workload
        randomInspector.setCurrentWorkload(randomInspector.getCurrentWorkload() + 1);
        inspectorRepository.save(randomInspector);

        // Step 8: Return response
        return SurpriseInspectionResponse.builder()
                .inspectionId(savedInspection.getInspectionCode())
                .institution(randomInstitution.getName())
                .inspector(randomInspector.getName())
                .status("ASSIGNED")
                .assignedAt(savedInspection.getAssignedAt())
                .build();
    }
}
