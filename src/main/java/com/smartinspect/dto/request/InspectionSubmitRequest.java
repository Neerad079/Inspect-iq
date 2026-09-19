package com.smartinspect.dto.request;

import lombok.Data;

@Data
public class InspectionSubmitRequest {
    private String remarks;
    private String checklistJson;
}
