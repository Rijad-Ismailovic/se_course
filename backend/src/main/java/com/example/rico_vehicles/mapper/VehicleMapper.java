package com.example.rico_vehicles.mapper;

import com.example.rico_vehicles.dto.VehicleDto;
import com.example.rico_vehicles.entity.User;
import com.example.rico_vehicles.entity.Vehicle;
import com.example.rico_vehicles.repository.UserRepository;

public class VehicleMapper {
    private static UserRepository userRepository;
    public static VehicleDto mapToVehicleDto(Vehicle vehicle){
        return new VehicleDto(
            vehicle.getId(),
            vehicle.getTitle(),
            vehicle.getManufacturer(),
            vehicle.getModel(),
            vehicle.getYearOfManufacture(),
            vehicle.getUser() != null ? vehicle.getUser().getId() : null
        );
    }

    public static Vehicle mapToVehicle(VehicleDto vehicleDto, User user){
        return new Vehicle(
                vehicleDto.getId(),
                vehicleDto.getTitle(),
                vehicleDto.getManufacturer(),
                vehicleDto.getModel(),
                vehicleDto.getYearOfManufacture(),
                user
        );
    }
}
