package com.springboot.apps.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
	
	@Id
	private String id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="user_id", nullable = false)
	private User user;
	
	@Column(name = "total_amount", nullable = false)
	private BigDecimal total_amount;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private OrderStatus status;
	
	@Column(name = "created_at")
	private LocalDateTime created_at;
	
	@Column(name = "updated_at")
	private LocalDateTime updated_at;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<OrderItem> orderItems;

	public Order() {
		super();
	}

	public Order(User user, BigDecimal total_amount, OrderStatus status, LocalDateTime created_at,
			LocalDateTime updated_at) {
		super();
		this.user = user;
		this.total_amount = total_amount;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public Order(String id, User user, BigDecimal total_amount, OrderStatus status, LocalDateTime created_at,
			LocalDateTime updated_at) {
		super();
		this.id = id;
		this.user = user;
		this.total_amount = total_amount;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public BigDecimal getTotal_amount() {
		return total_amount;
	}

	public void setTotal_amount(BigDecimal total_amount) {
		this.total_amount = total_amount;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
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

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}
	
}
