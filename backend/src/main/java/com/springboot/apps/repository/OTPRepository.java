package com.springboot.apps.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.apps.entity.OTP;

public interface OTPRepository extends JpaRepository<OTP, Integer> {
	public Optional<OTP> findByUser_IdAndOtp(int userId, String otp);
}
