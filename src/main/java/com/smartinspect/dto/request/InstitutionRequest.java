package com.smartinspect.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InstitutionRequest {
    @NotBlank
    private String name;
    
    @NotBlank
    private String address;
    
    @NotNull
    private Double latitude;
    
    @NotNull
    private Double longitude;
    
    private Integer capacity;
    private Integer staffCount;
    private Integer beneficiaryCount;
    private String status;
}
