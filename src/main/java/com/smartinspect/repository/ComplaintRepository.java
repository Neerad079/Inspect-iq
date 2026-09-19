package com.smartinspect.repository;

import com.smartinspect.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByInstitutionId(Long institutionId);
    Long countByInstitutionId(Long institutionId);
}
