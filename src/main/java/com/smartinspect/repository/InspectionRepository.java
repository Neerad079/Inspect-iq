package com.smartinspect.repository;

import com.smartinspect.model.Inspection;
import com.smartinspect.model.enums.InspectionStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InspectionRepository extends JpaRepository<Inspection, Long> {
    @EntityGraph(attributePaths = {"inspector", "institution", "inspector.user"})
    List<Inspection> findByInspectorId(Long inspectorId);
    List<Inspection> findByInstitutionId(Long institutionId);
    List<Inspection> findByStatus(InspectionStatus status);
    Optional<Inspection> findByInspectionCode(String inspectionCode);
    Long countByStatus(InspectionStatus status);
    Long countByInstitutionId(Long institutionId);
}
