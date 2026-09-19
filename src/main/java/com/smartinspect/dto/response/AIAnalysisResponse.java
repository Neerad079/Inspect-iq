package com.smartinspect.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AIAnalysisResponse {
    private Long institutionId;
    private String institutionName;
    private Double anomalyScore;
    private String riskLevel;
    private String details;
    private Boolean alertGenerated;
    private LocalDateTime analyzedAt;
}
