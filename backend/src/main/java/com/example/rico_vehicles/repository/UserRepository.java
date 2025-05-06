package com.example.rico_vehicles.repository;

import com.example.rico_vehicles.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> getUserByEmail(String email);

}
