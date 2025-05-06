package com.example.rico_vehicles.repository;

import com.example.rico_vehicles.entity.User;
import com.example.rico_vehicles.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findAllByUser(User user);
}
