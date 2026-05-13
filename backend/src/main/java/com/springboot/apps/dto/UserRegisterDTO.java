package com.springboot.apps.dto;

import jakarta.validation.constraints.Email;

public class UserRegisterDTO {
	
	@Email
	private String email;
	
	private String password;
	
	private String role;

	public UserRegisterDTO() {
	}
	

	public UserRegisterDTO(String email, String password) {
		super();
		this.email = email;
		this.password = password;
		this.role = "CUSTOMER";
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}


	@Override
	public String toString() {
		return "UserRegisterDTO [email=" + email + ", password=" + password + ", role=" + role
				+ "]";
	}
	
	

}
