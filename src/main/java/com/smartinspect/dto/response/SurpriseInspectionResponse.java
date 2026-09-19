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
public class SurpriseInspectionResponse {
    private String inspectionId;
    private String institution;
    private String inspector;
    private String status;
    private LocalDateTime assignedAt;
}
