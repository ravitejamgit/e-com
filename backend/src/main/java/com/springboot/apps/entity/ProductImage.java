package com.springboot.apps.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "productimages")
public class ProductImage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	int id;
	
	@OneToOne
	@JoinColumn(name = "product_id")
	Product product;
	
	@Column(name = "image_url")
	String url;

	public ProductImage() {
	}

	public ProductImage(Product product, String url) {
		this.product = product;
		this.url = url;
	}

	public ProductImage(int id, Product product, String url) {
		this.id = id;
		this.product = product;
		this.url = url;
	}

	public int getId() {
		return id;
	}


	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "ProductImage [id=" + id + ", product=" + product + ", url=" + url + "]";
	}
	
	
	
}
