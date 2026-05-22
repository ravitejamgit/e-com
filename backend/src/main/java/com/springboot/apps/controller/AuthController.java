package com.springboot.apps.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.apps.dto.UserLoginDTO;
import com.springboot.apps.entity.User;
import com.springboot.apps.service.AuthService;
import com.springboot.apps.service.JWTService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
	
	AuthService authService;
	JWTService jwtService;
	
	public AuthController(AuthService authService, JWTService jwtService) {
		this.authService = authService;
		this.jwtService = jwtService;
	}



	@PostMapping("/login")
	public ResponseEntity<?> loginAuth(@RequestBody UserLoginDTO userLoginDTO, HttpServletResponse response) {
		try {
			// Get user
			User user = authService.authenticate(userLoginDTO);
			
			// Generate Token
			String token = jwtService.generateToken(user.getUsername(), user.getRole().getName());
			
			// Generate cookie and set to response
			Cookie cookie = new Cookie("access token : ", token);
			cookie.setHttpOnly(true);
			cookie.setSecure(false);
			cookie.setPath("/");
			cookie.setMaxAge(10);
			response.addCookie(cookie);
			
			return ResponseEntity.ok(Map.of("name", user.getUsername(), "role", user.getRole().getName()));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
		}
		
	}
}


