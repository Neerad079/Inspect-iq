package com.smartinspect.service;

import com.smartinspect.exception.ResourceNotFoundException;
import com.smartinspect.model.Inspector;
import com.smartinspect.repository.InspectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InspectorService {

    private final InspectorRepository inspectorRepository;

    public List<Inspector> getAllInspectors() {
        return inspectorRepository.findAll();
    }

    public Inspector getInspectorById(Long id) {
        return inspectorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inspector not found with id: " + id));
    }

    public List<Inspector> getAvailableInspectors(int maxWorkload) {
        return inspectorRepository.findByAvailabilityTrueAndCurrentWorkloadLessThan(maxWorkload);
    }

    public Inspector getInspectorByUserId(Long userId) {
        return inspectorRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Inspector not found for user id: " + userId));
    }
}
