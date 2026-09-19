package com.smartinspect.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EvidenceRequest {
    @NotNull
    private Long inspectionId;
    
    private Double latitude;
    private Double longitude;
    private String type;
}
