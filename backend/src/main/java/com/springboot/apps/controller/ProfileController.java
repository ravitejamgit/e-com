package com.springboot.apps.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.apps.dto.UserDTO;
import com.springboot.apps.entity.User;
import com.springboot.apps.service.JWTService;
import com.springboot.apps.service.ProfileService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") 
public class ProfileController {
	
	ProfileService profileService;
	
	JWTService jwtService;
	
	@Autowired
	public ProfileController(ProfileService profileService, JWTService jwtService) {
		super();
		this.profileService = profileService;
		this.jwtService = jwtService;
	}

	@GetMapping("/profile/get")
	public ResponseEntity<?> getProfile(HttpServletRequest request) {
		try {
			User user = (User) request.getAttribute("authenticatedUser");
			return ResponseEntity.ok(profileService.fetchUserDetails(user)) ;
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
	
	@PutMapping("/profile/update/username")
	public ResponseEntity<?> updateUsername(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) {
		try {
			User user = (User) request.getAttribute("authenticatedUser");
			if(user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not authenticated.."));
			}
			
			if(!requestBody.containsKey("name")) {
				return ResponseEntity.unprocessableContent().body(Map.of("error", "Missing parameters"));
			}
			
			UserDTO userDTO = profileService.updateUsername(user, (String) requestBody.get("name"));
			
			if(userDTO != null) {
				String token = jwtService.generateToken(userDTO.getUsername(), userDTO.getRole());
				
				Cookie cookie = new Cookie("accessToken", token);
				cookie.setHttpOnly(true);
				cookie.setSecure(false);
				cookie.setPath("/");
				cookie.setMaxAge(3600);
				response.addCookie(cookie);
				
				return ResponseEntity.ok("Username updated successfully.");
			}
			
			return ResponseEntity.internalServerError().body(Map.of("error", "Username already exists."));
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
	
	@PutMapping("/profile/update/email")
	public ResponseEntity<?> updateEmail(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) {
		try {
			User user = (User) request.getAttribute("authenticatedUser");
			if(user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not authenticated.."));
			}
			
			if(!requestBody.containsKey("email")) {
				return ResponseEntity.unprocessableContent().body(Map.of("error", "Missing parameters"));
			}
			
			UserDTO userDTO = profileService.updateEmail(user, (String) requestBody.get("email"));
			
			if(userDTO != null) {
				
				return ResponseEntity.ok("Email updated successfully.");
			}
			
			return ResponseEntity.internalServerError().body(Map.of("error", "Email already exists."));
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
	
	@PutMapping("/profile/update/password")
	public ResponseEntity<?> updatePassword(@RequestBody Map<String, Object> requestBody, HttpServletRequest request) {
		try {
			User user = (User) request.getAttribute("authenticatedUser");
			if(user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not authenticated.."));
			}
			
			if(!requestBody.containsKey("password")) {
				return ResponseEntity.unprocessableContent().body(Map.of("error", "Missing parameters"));
			}
			
			UserDTO userDTO = profileService.updatePassword(user, (String) requestBody.get("password"));
			
			if(userDTO != null) {
				
				return ResponseEntity.ok("Password updated successfully.");
			}
			
			return ResponseEntity.internalServerError().body(Map.of("error", "Error in updating password."));
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
}
