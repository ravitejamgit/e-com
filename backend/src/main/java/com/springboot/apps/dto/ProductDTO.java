package com.springboot.apps.dto;


public class ProductDTO {
	
	String name;
	
	String description;
	
	String price;
	
	int stock;
	
	String category;
	
	String url;

	public ProductDTO(String name, String description, String price, int stock, String category, String url) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.stock = stock;
		this.category = category;
		this.url = url;
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

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "ProductDTO [name=" + name + ", description=" + description + ", price=" + price + ", stock=" + stock
				+ ", category=" + category + ", url=" + url + "]";
	}

}
