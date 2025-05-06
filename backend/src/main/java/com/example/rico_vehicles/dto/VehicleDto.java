package com.example.rico_vehicles.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDto {
    private Long id;
    private String title;
    private String manufacturer;
    private String model;
    private int yearOfManufacture;
    private Long userId;
}
