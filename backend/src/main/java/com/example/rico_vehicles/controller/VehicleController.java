package com.example.rico_vehicles.controller;

import com.example.rico_vehicles.dto.VehicleDto;
import com.example.rico_vehicles.entity.User;
import com.example.rico_vehicles.service.VehicleService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<VehicleDto> createVehicle(@RequestBody VehicleDto vehicleDto){
        VehicleDto savedVehicle = vehicleService.createVehicle(vehicleDto);
        return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<VehicleDto> getVehicleById(@PathVariable("id") Long vehicleId){
        VehicleDto vehicleDto = vehicleService.getVehicleById(vehicleId);
        return ResponseEntity.ok(vehicleDto);
    }

    @GetMapping
    public ResponseEntity<List<VehicleDto>> getAllVehicles(){
        List<VehicleDto> vehicles = vehicleService.getAllVehicles();
        return ResponseEntity.ok(vehicles);
    }

    @PutMapping("{id}")
    public ResponseEntity<VehicleDto> updatedVehicle(@PathVariable("id") Long vehicleId, @RequestBody VehicleDto updatedVehicle){
        VehicleDto vehicleDto = vehicleService.updateVehicle(vehicleId, updatedVehicle);
        return ResponseEntity.ok(vehicleDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable("id") Long vehicleId){
        vehicleService.deleteVehicle(vehicleId);
        return ResponseEntity.ok("Vehicle with given ID deleted succesfully: " + vehicleId);
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<List<VehicleDto>> getVehiclesByUser(@PathVariable("id") Long userId){
        List<VehicleDto> vehicles = vehicleService.getVehiclesByUser(userId);
        return ResponseEntity.ok(vehicles);
    }
}
