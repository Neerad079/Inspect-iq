package com.smartinspect.service;

import com.smartinspect.dto.response.AIAnalysisResponse;
import com.smartinspect.exception.ResourceNotFoundException;
import com.smartinspect.model.AIPrediction;
import com.smartinspect.model.Alert;
import com.smartinspect.model.Attendance;
import com.smartinspect.model.Institution;
import com.smartinspect.model.enums.AlertSeverity;
import com.smartinspect.repository.AIPredictionRepository;
import com.smartinspect.repository.AttendanceRepository;
import com.smartinspect.repository.ComplaintRepository;
import com.smartinspect.repository.InspectionRepository;
import com.smartinspect.repository.InstitutionRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AIIntegrationService {

    private final InstitutionRepository institutionRepository;
    private final AttendanceRepository attendanceRepository;
    private final ComplaintRepository complaintRepository;
    private final InspectionRepository inspectionRepository;
    private final AIPredictionRepository aiPredictionRepository;
    private final AlertService alertService;
    private final WebClient.Builder webClientBuilder;

    private WebClient webClient;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    @PostConstruct
    public void init() {
        this.webClient = webClientBuilder.baseUrl(aiServiceUrl).build();
    }

    @Transactional
    public AIAnalysisResponse analyzeInstitution(Long institutionId) {
        // Step 1: Get institution
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ResourceNotFoundException("Institution not found with id: " + institutionId));

        // Step 2: Get attendance (last 30 days)
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        List<Attendance> attendances = attendanceRepository.findByInstitutionIdAndDateBetween(
                institutionId, thirtyDaysAgo, LocalDate.now());

        // Step 3: Get complaints count
        long complaintCount = complaintRepository.countByInstitutionId(institutionId);
        long inspectionCount = inspectionRepository.countByInstitutionId(institutionId);

        // Step 5: Build feature payload
        List<Map<String, Object>> attendanceData = attendances.stream().map(a -> {
            Map<String, Object> map = new HashMap<>();
            map.put("date", a.getDate().toString());
            map.put("present_count", a.getPresentCount());
            map.put("absent_count", a.getAbsentCount());
            map.put("total_count", a.getTotalCount());
            return map;
        }).collect(Collectors.toList());

        Map<String, Object> features = new HashMap<>();
        features.put("institution_id", institutionId);
        features.put("name", institution.getName());
        features.put("staff_count", institution.getStaffCount());
        features.put("beneficiary_count", institution.getBeneficiaryCount());
        features.put("capacity", institution.getCapacity());
        features.put("attendance_data", attendanceData);
        features.put("complaint_count", complaintCount);
        features.put("inspection_count", inspectionCount);

        try {
            // Step 6: POST to FastAPI
            Map<String, Object> response = webClient.post()
                    .uri("/api/predict")
                    .bodyValue(features)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();

            if (response != null) {
                double anomalyScore = Double.parseDouble(response.getOrDefault("anomaly_score", "0").toString());
                String riskLevel = response.getOrDefault("risk_level", "UNKNOWN").toString();
                String details = response.getOrDefault("details", "").toString();

                // Step 7: Store AI prediction
                AIPrediction prediction = AIPrediction.builder()
                        .institution(institution)
                        .anomalyScore(anomalyScore)
                        .riskLevel(riskLevel)
                        .detailsJson(details)
                        .build();

                AIPrediction savedPrediction = aiPredictionRepository.save(prediction);

                // Step 8: If high anomaly → create alert
                boolean alertGenerated = false;
                if (anomalyScore > 0.7) {
                    Alert alert = Alert.builder()
                            .institution(institution)
                            .prediction(savedPrediction)
                            .title("AI Anomaly Detected")
                            .description("High anomaly score (" + String.format("%.2f", anomalyScore)
                                    + ") detected for " + institution.getName() + ". Risk Level: " + riskLevel)
                            .severity(AlertSeverity.HIGH)
                            .isRead(false)
                            .build();
                    alertService.createAlert(alert);
                    alertGenerated = true;
                }

                // Step 9: Return result
                return AIAnalysisResponse.builder()
                        .institutionId(institutionId)
                        .institutionName(institution.getName())
                        .anomalyScore(anomalyScore)
                        .riskLevel(riskLevel)
                        .details(details)
                        .alertGenerated(alertGenerated)
                        .analyzedAt(LocalDateTime.now())
                        .build();
            }
        } catch (Exception e) {
            // AI service unavailable - return graceful fallback
            return AIAnalysisResponse.builder()
                    .institutionId(institutionId)
                    .institutionName(institution.getName())
                    .anomalyScore(0.0)
                    .riskLevel("UNKNOWN")
                    .details("AI service unavailable: " + e.getMessage())
                    .alertGenerated(false)
                    .analyzedAt(LocalDateTime.now())
                    .build();
        }

        return AIAnalysisResponse.builder()
                .institutionId(institutionId)
                .institutionName(institution.getName())
                .anomalyScore(0.0)
                .riskLevel("UNKNOWN")
                .details("No response from AI service")
                .alertGenerated(false)
                .analyzedAt(LocalDateTime.now())
                .build();
    }

    public List<AIPrediction> getPredictions(Long institutionId) {
        return aiPredictionRepository.findByInstitutionIdOrderByPredictedAtDesc(institutionId);
    }
}
