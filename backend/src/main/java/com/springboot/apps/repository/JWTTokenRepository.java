package com.springboot.apps.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.apps.entity.JWTToken;

public interface JWTTokenRepository extends JpaRepository<JWTToken, Integer> {
	
}	
