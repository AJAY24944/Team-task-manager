package com.taskmanager.backend.controller;

import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.backend.security.JwtUtil;

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

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        user.setRole("MEMBER");

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody User loginUser) {

        User user = userRepository.findByEmail(loginUser.getEmail());

        if (user != null &&
                passwordEncoder.matches(
                        loginUser.getPassword(),
                        user.getPassword()
                )) {

            String token =
                    JwtUtil.generateToken(user.getEmail());

            return token;
        }

        return "Invalid Email or Password";
    }
}