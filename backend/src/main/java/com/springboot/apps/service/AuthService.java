package com.springboot.apps.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.apps.dto.UserLoginDTO;
import com.springboot.apps.entity.User;
import com.springboot.apps.repository.UserRepository;

@Service
public class AuthService {
	
	
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	
	public AuthService(UserRepository userRepository, @Qualifier("bcryptEncoder") PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User authenticate(UserLoginDTO userLoginDTO) {
		User user = userRepository.findByEmail(userLoginDTO.getEmail())
				.orElseThrow(() -> new RuntimeException("No User Found.."));
		
		if(!passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
			throw new RuntimeException("Incorrect password.");
		}
		
		return user;
	}
	
	
}
