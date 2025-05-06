package com.example.rico_vehicles.mapper;

import com.example.rico_vehicles.dto.UserDto;
import com.example.rico_vehicles.entity.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                user.getImagePath()
        );
    }

    public static User mapToUser(UserDto userDto){
        return new User(
                userDto.getId(),
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getImagePath()
        );
    }
}
