package com.taskmanager.backend.controller;

import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.backend.security.JwtUtil;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        System.out.println("Original Password: " + user.getPassword());

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        System.out.println("Encrypted Password: " + user.getPassword());

        user.setRole("ADMIN");

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody User loginUser) {

        User user = userRepository.findByEmail(loginUser.getEmail());

        if (user == null) {
            return "User Not Found";
        }

        boolean passwordMatch = passwordEncoder.matches(
                loginUser.getPassword(),
                user.getPassword()
        );

        System.out.println("Password Match: " + passwordMatch);

        if (passwordMatch) {

            String token = JwtUtil.generateToken(user.getEmail());

            return Map.of(
                    "token", token,
                    "role", user.getRole(),
                    "email", user.getEmail()
            );
        }

        return "Invalid Email or Password";
    }
}