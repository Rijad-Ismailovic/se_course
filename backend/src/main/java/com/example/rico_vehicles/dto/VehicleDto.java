package com.example.rico_vehicles.dto;

import jakarta.persistence.Column;
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
    private Long userId;
    private String title;
    private String manufacturer;
    private String model;
    private Integer yearOfManufacture;
    private Double engineSize;
    private String fuelType;
    private Integer kw;
    private Integer distanceTraveled;
    private String city;
    private Double price;
    private String description;
    private String imagePath;
}
