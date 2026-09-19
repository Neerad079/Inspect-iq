package com.smartinspect.service;

import com.smartinspect.exception.ResourceNotFoundException;
import com.smartinspect.model.Alert;
import com.smartinspect.model.enums.AlertSeverity;
import com.smartinspect.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;

    @Cacheable("alerts")
    public List<Alert> getAllAlerts() {
        return alertRepository.findAllByOrderByCreatedAtDesc();
    }

    public Alert getAlertById(Long id) {
        return alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found with id: " + id));
    }

    public List<Alert> getUnreadAlerts() {
        return alertRepository.findByIsReadFalseOrderByCreatedAtDesc();
    }

    public List<Alert> getAlertsBySeverity(AlertSeverity severity) {
        return alertRepository.findBySeverityOrderByCreatedAtDesc(severity);
    }

    @CacheEvict(value = "alerts", allEntries = true)
    public Alert markAsRead(Long id) {
        Alert alert = getAlertById(id);
        alert.setIsRead(true);
        return alertRepository.save(alert);
    }

    @CacheEvict(value = "alerts", allEntries = true)
    public Alert createAlert(Alert alert) {
        return alertRepository.save(alert);
    }
}
