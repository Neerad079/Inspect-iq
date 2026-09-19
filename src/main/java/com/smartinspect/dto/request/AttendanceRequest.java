package com.smartinspect.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendanceRequest {
    @NotNull
    private Long institutionId;
    
    @NotNull
    private LocalDate date;
    
    @NotNull
    private Integer presentCount;
    
    @NotNull
    private Integer absentCount;
    
    @NotNull
    private Integer totalCount;
}
