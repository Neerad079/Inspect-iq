package com.smartinspect.service;

import com.smartinspect.dto.request.InstitutionRequest;
import com.smartinspect.exception.ResourceNotFoundException;
import com.smartinspect.model.Institution;
import com.smartinspect.model.enums.InstitutionStatus;
import com.smartinspect.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstitutionService {

    private final InstitutionRepository institutionRepository;

    @Cacheable("institutions")
    public List<Institution> getAllInstitutions() {
        return institutionRepository.findAll();
    }

    public List<Institution> getInstitutionsByStatus(InstitutionStatus status) {
        return institutionRepository.findByStatus(status);
    }

    public Institution getInstitutionById(Long id) {
        return institutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Institution not found with id: " + id));
    }

    @CacheEvict(value = "institutions", allEntries = true)
    public Institution createInstitution(InstitutionRequest req) {
        Institution institution = Institution.builder()
                .name(req.getName())
                .address(req.getAddress())
                .latitude(req.getLatitude())
                .longitude(req.getLongitude())
                .capacity(req.getCapacity())
                .staffCount(req.getStaffCount())
                .beneficiaryCount(req.getBeneficiaryCount())
                .status(InstitutionStatus.ACTIVE)
                .build();
        return institutionRepository.save(institution);
    }

    @CacheEvict(value = "institutions", allEntries = true)
    public Institution updateInstitution(Long id, InstitutionRequest req) {
        Institution institution = getInstitutionById(id);

        if (req.getName() != null) institution.setName(req.getName());
        if (req.getAddress() != null) institution.setAddress(req.getAddress());
        if (req.getLatitude() != null) institution.setLatitude(req.getLatitude());
        if (req.getLongitude() != null) institution.setLongitude(req.getLongitude());
        if (req.getCapacity() != null) institution.setCapacity(req.getCapacity());
        if (req.getStaffCount() != null) institution.setStaffCount(req.getStaffCount());
        if (req.getBeneficiaryCount() != null) institution.setBeneficiaryCount(req.getBeneficiaryCount());
        if (req.getStatus() != null) {
            institution.setStatus(InstitutionStatus.valueOf(req.getStatus()));
        }

        return institutionRepository.save(institution);
    }
}
