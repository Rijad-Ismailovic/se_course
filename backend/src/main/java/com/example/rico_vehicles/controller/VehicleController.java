    package com.example.rico_vehicles.controller;

    import com.example.rico_vehicles.dto.VehicleDto;
    import com.example.rico_vehicles.entity.User;
    import com.example.rico_vehicles.mapper.UserMapper;
    import com.example.rico_vehicles.service.FileService;
    import com.example.rico_vehicles.service.UserService;
    import com.example.rico_vehicles.service.VehicleService;
    import lombok.AllArgsConstructor;
    import org.apache.coyote.Response;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;

    import java.util.List;

    @CrossOrigin(origins = "http://localhost:3000")
    @AllArgsConstructor
    @RestController
    @RequestMapping("/api/vehicles")
    public class VehicleController {

        private VehicleService vehicleService;
        private UserService userService;

        @PostMapping
        public ResponseEntity<?> createVehicle(
                @RequestPart("vehicleDto") VehicleDto vehicleDto,
                @RequestPart("imageFile")MultipartFile image,
                @RequestParam("userId") Long userId){
            try{
                vehicleDto.setUserId(userId);

                String imagePath = FileService.uploadFile(image, "uploads/thumbnails/");
                vehicleDto.setImagePath(imagePath);

                VehicleDto savedVehicleDto = vehicleService.createVehicle(vehicleDto);
                return new ResponseEntity<>(savedVehicleDto, HttpStatus.CREATED);
            }catch(Exception e){
                return new ResponseEntity<>("Error creating vehicle: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @PutMapping("{id}")
        public ResponseEntity<?> updatedVehicle(
                @PathVariable("id") Long vehicleId,
                @RequestPart("vehicleDto") VehicleDto updatedVehicle,
                @RequestPart(value = "imageFile", required = false) MultipartFile image){
            try{
                if(image != null){
                    String imagePath = FileService.uploadFile(image, "uploads/thumbnails/");
                    updatedVehicle.setImagePath(imagePath);
                }else{
                    updatedVehicle.setImagePath("Do not change image");
                }

                VehicleDto vehicleDto = vehicleService.updateVehicle(vehicleId, updatedVehicle);
                return ResponseEntity.ok(vehicleDto);
            } catch(Exception e){
                return new ResponseEntity<>("Error updating vehicle: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
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
