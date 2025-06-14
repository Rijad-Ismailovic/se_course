package com.example.rico_vehicles.service.impl;

import com.example.rico_vehicles.dto.VehicleDto;
import com.example.rico_vehicles.entity.User;
import com.example.rico_vehicles.entity.Vehicle;
import com.example.rico_vehicles.exception.ResourceNotFoundException;
import com.example.rico_vehicles.mapper.VehicleMapper;
import com.example.rico_vehicles.repository.UserRepository;
import com.example.rico_vehicles.repository.VehicleRepository;
import com.example.rico_vehicles.service.VehicleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private VehicleRepository vehicleRepository;
    private UserRepository userRepository;

    @Override
    public VehicleDto createVehicle(VehicleDto vehicleDto) {

        User user = userRepository.findById(vehicleDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Vehicle vehicle = VehicleMapper.mapToVehicle(vehicleDto, user);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return VehicleMapper.mapToVehicleDto(savedVehicle);
    }

    @Override
    public VehicleDto updateVehicle(Long vehicleId, VehicleDto updatedVehicle) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle with given ID does not exist: " + vehicleId));
        /*User user = userRepository.findById(updatedVehicle.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User with given ID does not exist: " + updatedVehicle.getUserId()));
        vehicle.setUser(user);*/

        vehicle.setTitle(updatedVehicle.getTitle());
        vehicle.setManufacturer(updatedVehicle.getManufacturer());
        vehicle.setModel(updatedVehicle.getModel());
        vehicle.setYearOfManufacture(updatedVehicle.getYearOfManufacture());
        vehicle.setEngineSize(updatedVehicle.getEngineSize());
        vehicle.setFuelType(updatedVehicle.getFuelType());
        vehicle.setKW(updatedVehicle.getKw());
        vehicle.setDistanceTraveled(updatedVehicle.getDistanceTraveled());
        vehicle.setCity(updatedVehicle.getCity());
        vehicle.setPrice(updatedVehicle.getPrice());
        vehicle.setDescription(updatedVehicle.getDescription());
        if(updatedVehicle.getImagePath() != "Do not change image"){
            vehicle.setImagePath(updatedVehicle.getImagePath());
        }else{
            vehicle.setImagePath(vehicle.getImagePath());
        }

        Vehicle updatedVehicleObj = vehicleRepository.save(vehicle);

        return VehicleMapper.mapToVehicleDto(updatedVehicleObj);

    }

    @Override
    public VehicleDto getVehicleById(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle with given ID does not exist: " + vehicleId));
        return VehicleMapper.mapToVehicleDto(vehicle);
    }

    @Override
    public List<VehicleDto> getAllVehicles(){
        List<Vehicle> vehicles = vehicleRepository.findAll();
        return vehicles.stream()
                .map( (vehicle) -> VehicleMapper.mapToVehicleDto(vehicle))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle with given ID does not exist: " + vehicleId));
        vehicleRepository.deleteById(vehicleId);
    }

    @Override
    public List<VehicleDto> getVehiclesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with given ID does not exist: " + userId));
        List<Vehicle> vehicles = vehicleRepository.findAllByUser(user);
        return vehicles.stream()
                .map( (vehicle -> VehicleMapper.mapToVehicleDto(vehicle)))
                .collect(Collectors.toList());
    }
}
