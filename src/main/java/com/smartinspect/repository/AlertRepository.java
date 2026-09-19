package com.smartinspect.repository;

import com.smartinspect.model.Alert;
import com.smartinspect.model.enums.AlertSeverity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByIsReadFalseOrderByCreatedAtDesc();
    List<Alert> findBySeverityOrderByCreatedAtDesc(AlertSeverity severity);
    List<Alert> findAllByOrderByCreatedAtDesc();
    List<Alert> findByInstitutionId(Long institutionId);
}
