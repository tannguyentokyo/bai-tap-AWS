package com.example.be.controller;

import com.example.be.dto.LoginDto;
import com.example.be.dto.RegisterDto;
import com.example.be.entity.User;
import com.example.be.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginDto dto) {
    User user = userRepository.findByUsername(dto.getUsername());

    if (user == null || !passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok(user);
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterDto dto) {
    if (userRepository.findByUsername(dto.getUsername()) != null) {
      return ResponseEntity.badRequest().build();
    }

    User user = new User();
    user.setUsername(dto.getUsername());
    user.setPassword(passwordEncoder.encode(dto.getPassword()));
    user.setName(dto.getName());

    return ResponseEntity.ok(userRepository.save(user));
  }
}
