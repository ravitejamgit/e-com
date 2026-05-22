package com.springboot.apps.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "tokens")
public class JWTToken {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "token_id")
	int id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
	@Column(name = "token")
	String token;
	
	@Column(name = "created_at")
	LocalDateTime created_at;
	
	@Column(name = "expires_at")
	LocalDateTime expires_at;

	public JWTToken() {
		super();
	}

	public JWTToken(User user, String token, LocalDateTime created_at, LocalDateTime expires_at) {
		super();
		this.user = user;
		this.token = token;
		this.created_at = created_at;
		this.expires_at = expires_at;
	}

	public JWTToken(int id, User user, String token, LocalDateTime created_at, LocalDateTime expires_at) {
		super();
		this.id = id;
		this.user = user;
		this.token = token;
		this.created_at = created_at;
		this.expires_at = expires_at;
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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getExpires_at() {
		return expires_at;
	}

	public void setExpires_at(LocalDateTime expires_at) {
		this.expires_at = expires_at;
	}

	@Override
	public String toString() {
		return "JWTToken [id=" + id + ", user=" + user + ", token=" + token + ", created_at=" + created_at
				+ ", expires_at=" + expires_at + "]";
	}
	
	
}
