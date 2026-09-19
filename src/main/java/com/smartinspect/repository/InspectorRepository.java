package com.smartinspect.repository;

import com.smartinspect.model.Inspector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InspectorRepository extends JpaRepository<Inspector, Long> {
    List<Inspector> findByAvailabilityTrueAndCurrentWorkloadLessThan(Integer maxWorkload);
    Optional<Inspector> findByUserId(Long userId);
    Optional<Inspector> findByEmail(String email);
}
