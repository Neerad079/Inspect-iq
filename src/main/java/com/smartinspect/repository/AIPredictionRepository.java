package com.smartinspect.repository;

import com.smartinspect.model.AIPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AIPredictionRepository extends JpaRepository<AIPrediction, Long> {
    List<AIPrediction> findByInstitutionIdOrderByPredictedAtDesc(Long institutionId);
}
