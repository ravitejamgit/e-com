package com.springboot.apps.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "otp")
public class OTP {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	User user;
	
	@Column(name = "otp")
	String otp;
	
	@Column(name = "created_at")
	LocalDateTime created_at;
	
	@Column(name = "updated_at")
	LocalDateTime updated_at;

	public OTP(int id, User user, String otp, LocalDateTime created_at, LocalDateTime updated_at) {
		super();
		this.id = id;
		this.user = user;
		this.otp = otp;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public OTP(User user, String otp, LocalDateTime created_at, LocalDateTime updated_at) {
		super();
		this.user = user;
		this.otp = otp;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public OTP() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}
	
	
}
