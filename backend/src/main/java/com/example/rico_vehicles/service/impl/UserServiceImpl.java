package com.example.rico_vehicles.service.impl;

import com.example.rico_vehicles.dto.UserDto;
import com.example.rico_vehicles.entity.User;
import com.example.rico_vehicles.exception.ResourceNotFoundException;
import com.example.rico_vehicles.mapper.UserMapper;
import com.example.rico_vehicles.repository.UserRepository;
import com.example.rico_vehicles.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    @Override
    public UserDto createUser(UserDto userDto){
        String hashedPassword = passwordEncoder.encode(userDto.getPassword());

        User user = UserMapper.mapToUser(userDto);
        user.setPassword(hashedPassword);

        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new ResourceNotFoundException("User with given ID does not exist: " + userId));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map((user) -> UserMapper.mapToUserDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long userId, UserDto updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with given ID does not exist: " + userId));

        String hashedPassword = passwordEncoder.encode(updatedUser.getPassword());

        user.setEmail(updatedUser.getEmail());
        user.setPassword(hashedPassword);
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        if (updatedUser.getImagePath() != "Do not change image"){
            user.setImagePath(updatedUser.getImagePath());
        } else{
            user.setImagePath(user.getImagePath()); //keep same image. very bad fix but idc
        }

        User updatedUserObj = userRepository.save(user);

        return UserMapper.mapToUserDto(updatedUserObj);

    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new ResourceNotFoundException("User with given ID does not exist: " + userId));
        userRepository.delete(user);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.getUserByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User with given Email does not exist: " + email));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public boolean authenticateUser(String email, String password) {
        Optional<User> user = userRepository.getUserByEmail(email);
        if (user.isEmpty()) {
            return false;
        }

        if (passwordEncoder.matches(password, user.get().getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean doesUserWithEmailExist(String email) {
        Optional<User> user = userRepository.getUserByEmail(email);
        return user.isPresent();
    }


}
