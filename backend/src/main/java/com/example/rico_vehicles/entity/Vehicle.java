package com.example.rico_vehicles.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    @Column(name = "title")
    private String title;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "year_of_manufacture")
    private Integer yearOfManufacture;

    @Column(name = "engine_size")
    private Double engineSize;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "kW")
    private Integer kW;

    @Column(name = "distance_traveled")
    private Integer distanceTraveled;

    @Column(name = "city")
    private String city;

    @Column(name = "price")
    private Double price;

    @Column(name = "description", columnDefinition = "TEXT")
    @Lob
    private String description;

    @Column(name = "image_path")
    private String imagePath;
}
