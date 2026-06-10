package com.springboot.apps.dto;

import com.springboot.apps.entity.Role;

public class UserDTO {

	private int id;
	private String username;
	private String email;
	private String role;

	
	
	public UserDTO() {
		super();
	}



	public UserDTO(String username, String email, String role) {
		super();
		this.username = username;
		this.email = email;
		this.role = role;
	}



	public UserDTO(int id, String username, String email, String role) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.role = role;
	}



	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getRole() {
		return role;
	}



	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", username=" + username + ", email=" + email + ", role=" + role + "]";
	}

}
