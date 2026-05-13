package com.springboot.apps.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.apps.dto.UserLoginDTO;
import com.springboot.apps.dto.UserRegisterDTO;
import com.springboot.apps.entity.User;
import com.springboot.apps.service.UserService;

import jakarta.validation.Valid;


@Controller
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	// Dependency
	UserService userService;
		
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}


	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterDTO userRegisterDTO) {
		try {
			User userResponse = userService.registerUser(userRegisterDTO);
			return ResponseEntity.ok(Map.of("message", "User successfully registered..", "user", userResponse));
		}
		catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginDTO userLoginDTO) {
		try {
			User userResponse = userService.loginUser(userLoginDTO);
			return ResponseEntity.ok(Map.of("message", "Login Successfull", "user", userResponse.getUsername()));
		}
		catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
 	
}
