package com.springboot.apps.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "orderitems")
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="order_id")
	private Order order;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;
	
	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "price_per_unit")
	private BigDecimal pricePerUnit;
	
	@Column(name = "total_price")
	private BigDecimal totalPrice;

	public OrderItem() {
		super();
	}

	public OrderItem(Order order, Product product, int quantity, BigDecimal pricePerUnit, BigDecimal totalPrice) {
		super();
		this.order = order;
		this.product = product;
		this.quantity = quantity;
		this.pricePerUnit = pricePerUnit;
		this.totalPrice = totalPrice;
	}

	public OrderItem(int id, Order order, Product product, int quantity, BigDecimal pricePerUnit,
			BigDecimal totalPrice) {
		super();
		this.id = id;
		this.order = order;
		this.product = product;
		this.quantity = quantity;
		this.pricePerUnit = pricePerUnit;
		this.totalPrice = totalPrice;
	}

	public int getId() {
		return id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getPricePerUnit() {
		return pricePerUnit;
	}

	public void setPricePerUnit(BigDecimal pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}
	
}
