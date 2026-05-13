package com.springboot.apps.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.apps.dto.UserLoginDTO;
import com.springboot.apps.dto.UserRegisterDTO;
import com.springboot.apps.entity.Role;
import com.springboot.apps.entity.User;
import com.springboot.apps.repository.RoleRepository;
import com.springboot.apps.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {
	
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	
	public UserServiceImp(UserRepository userRepository, @Qualifier("bcryptEncoder") PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User registerUser(UserRegisterDTO userRegisterDTO) {
		if(userRepository.findByEmail(userRegisterDTO.getEmail()).isPresent()) {
			throw new RuntimeException("User already exists...");
		}
		
		Role role = roleRepository.findByName(userRegisterDTO.getRole()).orElseThrow(() -> new RuntimeException("Role does not exist...."));
		
		User user = new User(
				userRegisterDTO.getName(),
				userRegisterDTO.getEmail(),
				passwordEncoder.encode(userRegisterDTO.getPassword()),
				role,
				true,
				LocalDateTime.now(),
				LocalDateTime.now()
		);
		
		return userRepository.save(user);
	}

	@Override
	public User loginUser(UserLoginDTO userLoginDTO) throws RuntimeException {
		
		User user = userRepository.findByEmail(userLoginDTO.getEmail()).orElseThrow(() -> new RuntimeException("No user found..."));
		if(passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
			return user;
		}
		else {
			throw new RuntimeException("Incorrect password..");
		}
		
	}

}
