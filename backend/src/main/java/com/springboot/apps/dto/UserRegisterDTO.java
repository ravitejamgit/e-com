package com.springboot.apps.dto;

import jakarta.validation.constraints.Email;

public class UserRegisterDTO {
	
	private String name;
	private String email;
	private String password;
	private String role;
	
	public UserRegisterDTO() {
		super();
	}
	public UserRegisterDTO(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = "CUSTOMER";
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
		return "UserRegisterDTO [name=" + name + ", email=" + email + ", password=" + password + ", role=" + role + "]";
	}
	
}
