package com.springboot.apps.utils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.springboot.apps.entity.OTP;
import com.springboot.apps.entity.User;
import com.springboot.apps.repository.OTPRepository;

@Component
public class OTPUtility {
	
	JavaMailSender mailSender;
	
	OTPRepository otpRepository;
	
	
	public OTPUtility(JavaMailSender mailSender, OTPRepository otpRepository) {
		this.mailSender = mailSender;
		this.otpRepository = otpRepository;
	}



	public void send(User user) {
		String otp = String.format("%06d", new Random().nextInt(999999));
		
		otpRepository.save(new OTP(
				user,
				otp,
				LocalDateTime.now(),
				LocalDateTime.now()
			));
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject("Reset password OTP");
		message.setText("Use code : " + otp + " to reset the password.");
		mailSender.send(message);
		
	}
	
	public boolean verify(String otp, User user) {
		
		OTP fetched = otpRepository.findByUser_IdAndOtp(user.getId(), otp).orElseThrow(() -> new RuntimeException("No entry found.."));
		
		if(fetched != null && ChronoUnit.MINUTES.between(fetched.getCreated_at(), LocalDateTime.now()) < 1) {
			otpRepository.delete(fetched);
			return true;
		}
		
		return false;
	}
}
