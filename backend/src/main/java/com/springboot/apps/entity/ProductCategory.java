package com.springboot.apps.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class ProductCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "category_id")
	int id;
	
	@Column(name = "name")
	String name;

	public ProductCategory() {
		
	}
	
	public ProductCategory(String name) {
		this.name = name;
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

	@Override
	public String toString() {
		return "ProductCategory [id=" + id + ", name=" + name + "]";
	}
	
	
	
}
