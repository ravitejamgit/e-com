package com.springboot.apps.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.apps.entity.Product;
import com.springboot.apps.entity.ProductImage;
import com.springboot.apps.repository.ProductImageRepository;
import com.springboot.apps.repository.ProductRepository;

@Service
public class ProductsService {
	
	ProductRepository productRepository;
	
	ProductImageRepository productImageRepository;
	
	


	public ProductsService(ProductRepository productRepository, ProductImageRepository productImageRepository) {
		super();
		this.productRepository = productRepository;
		this.productImageRepository = productImageRepository;
	}

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	public String getProductImage(int id) {
		return productImageRepository.findByProduct_id(id).getUrl();
	}
	
}
