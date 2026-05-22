package com.springboot.apps.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	int id;
	
	@Column(name = "name")
	String name;
	
	@Column(name = "description")
	String description;
	
	@Column(name = "price")
	double price;
	
	@Column(name = "stock")
	Integer stock;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	ProductCategory category;
	
	@Column(name = "created_at")
	LocalDateTime created_at;
	
	@Column(name = "updated_at")
	LocalDateTime updated_at;

	public Product() {
	}

	public Product(String name, String description, double price, Integer stock, ProductCategory category,
			LocalDateTime created_at, LocalDateTime updated_at) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.stock = stock;
		this.category = category;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public Product(int id, String name, String description, double price, Integer stock, ProductCategory category,
			LocalDateTime created_at, LocalDateTime updated_at) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.stock = stock;
		this.category = category;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public ProductCategory getCategory() {
		return category;
	}

	public void setCategory(ProductCategory category) {
		this.category = category;
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

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price + ", stock="
				+ stock + ", category=" + category + ", created_at=" + created_at + ", updated_at=" + updated_at + "]";
	}
	
	
	
}
