package com.smartinspect.repository;

import com.smartinspect.model.Institution;
import com.smartinspect.model.enums.InstitutionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    List<Institution> findByStatus(InstitutionStatus status);
}
