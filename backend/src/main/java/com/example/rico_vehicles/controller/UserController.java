package com.example.rico_vehicles.controller;

import com.example.rico_vehicles.dto.LoginRequestDto;
import com.example.rico_vehicles.dto.UserDto;
import com.example.rico_vehicles.service.FileService;
import com.example.rico_vehicles.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestPart("userDto") UserDto userDto, @RequestPart(value = "imageFile", required = false) MultipartFile image){
        try {
            if(image != null){
                String imagePath = FileService.uploadFile(image, "uploads/profile_pictures/");
                userDto.setImagePath(imagePath);
            }

            UserDto savedUser = userService.createUser(userDto);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error saving user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId){
        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userId, @RequestBody UserDto updatedUser){
        UserDto userDto = userService.updateUser(userId, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok("User with given ID deleted succesfully: " + userId);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequestDto loginRequestDto){
        Map<String, Object> response = new HashMap<>();
        boolean isAuthenticated = userService.authenticateUser(loginRequestDto.getEmail(), loginRequestDto.getPassword());

        if(isAuthenticated){
            Long userId = userService.getUserByEmail(loginRequestDto.getEmail()).getId();
            response.put("message", "Login successful");
            response.put("userId", userId);
            return ResponseEntity.ok(response);
        }else{
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/emailCheck")
    public ResponseEntity<Boolean> doesUserWithEmailExist(@RequestBody String email){
        return ResponseEntity.ok(userService.doesUserWithEmailExist(email));
    }
}
