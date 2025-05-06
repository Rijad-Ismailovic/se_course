package com.example.rico_vehicles.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class FileService {
    public static String uploadFile(MultipartFile image, String uploadDir) throws IOException {
        // Ensure directory exists
        Files.createDirectories(Paths.get(uploadDir));

        // Generate unique file name
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        // Save file locally
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Store relative path instead of absolute path
        return "uploads/profile_pictures/" + fileName;
    }
}
