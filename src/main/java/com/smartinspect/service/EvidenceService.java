package com.smartinspect.service;

import com.smartinspect.exception.ResourceNotFoundException;
import com.smartinspect.model.Evidence;
import com.smartinspect.model.Inspection;
import com.smartinspect.model.enums.EvidenceType;
import com.smartinspect.repository.EvidenceRepository;
import com.smartinspect.repository.InspectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EvidenceService {

    private final EvidenceRepository evidenceRepository;
    private final InspectionRepository inspectionRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Transactional
    public Evidence uploadEvidence(Long inspectionId, MultipartFile file, Double latitude, Double longitude, String type) {
        Inspection inspection = inspectionRepository.findById(inspectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Inspection not found with id: " + inspectionId));

        try {
            // Create directory: uploads/{inspectionId}/
            Path directory = Paths.get(uploadDir, String.valueOf(inspectionId));
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String generatedFilename = UUID.randomUUID().toString() + "_" + originalFilename;
            Path filePath = directory.resolve(generatedFilename);

            // Save file to disk
            Files.copy(file.getInputStream(), filePath);

            // Build relative URL path
            String relativePath = Paths.get(String.valueOf(inspectionId), generatedFilename).toString().replace('\\', '/');

            // Create evidence record
            Evidence evidence = Evidence.builder()
                    .inspection(inspection)
                    .fileUrl(relativePath)
                    .latitude(latitude)
                    .longitude(longitude)
                    .timestamp(LocalDateTime.now())
                    .type(EvidenceType.valueOf(type.toUpperCase()))
                    .build();

            return evidenceRepository.save(evidence);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store evidence file: " + e.getMessage(), e);
        }
    }

    public List<Evidence> getEvidenceByInspection(Long inspectionId) {
        return evidenceRepository.findByInspectionId(inspectionId);
    }
}
