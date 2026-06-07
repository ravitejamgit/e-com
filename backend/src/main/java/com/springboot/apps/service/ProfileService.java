package com.springboot.apps.service;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.apps.dto.UserDTO;
import com.springboot.apps.entity.User;
import com.springboot.apps.repository.UserRepository;

@Service
public class ProfileService {
	
	UserRepository userRepository;
	
	@Value("${admin.username}")
	String adminUsername;
	
	@Value("${admin.email}")
	String adminEmail;
	
	PasswordEncoder passwordEncoder;
	
	
	public ProfileService(UserRepository userRepository, @Qualifier("bcryptEncoder") PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public UserDTO fetchUserDetails(User user) {
		return new UserDTO(user.getUsername(), user.getEmail(), user.getRole().getName());
	}
	
	public UserDTO updateEmail(User user, String email) {
		
		if(email.equals(adminEmail)) {
			throw new RuntimeException("Restricted email..");
		}
		
		if(userRepository.existsByUsername(email)) {
			return null;
		}
		user.setEmail(email);
		user.setUpdatedAt(LocalDateTime.now());
		User response = userRepository.save(user);
		return new UserDTO(response.getUsername(), response.getEmail(), response.getRole().getName());
	}
	
	
	public UserDTO updateUsername(User user, String username) {
		
		if(username.equals(adminUsername)) {
			throw new RuntimeException("Restricted username.");
		}
		
		if(userRepository.existsByUsername(username)) {
			return null;
		}
		user.setUsername(username);
		user.setUpdatedAt(LocalDateTime.now());
		User response = userRepository.save(user);
		return new UserDTO(response.getUsername(), response.getEmail(), response.getRole().getName());
	}
	
	public UserDTO updatePassword(User user, String password) {
		user.setPassword(passwordEncoder.encode(password));
		user.setUpdatedAt(LocalDateTime.now());
		User response = userRepository.save(user);
		return new UserDTO(response.getUsername(), response.getEmail(), response.getRole().getName());
	}
} 
