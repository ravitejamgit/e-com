package com.springboot.apps.service;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.springboot.apps.dto.ProductDTO;
import com.springboot.apps.entity.Product;
import com.springboot.apps.entity.ProductCategory;
import com.springboot.apps.entity.ProductImage;
import com.springboot.apps.repository.ProductCategoryRepository;
import com.springboot.apps.repository.ProductImageRepository;
import com.springboot.apps.repository.ProductRepository;

@Service
public class AdminService {
	
	ProductRepository productRepository;
	
	ProductImageRepository productImageRepository;
	
	ProductCategoryRepository productCategoryRepository;
	
	public AdminService(ProductRepository productRepository, ProductImageRepository productImageRepository,
			ProductCategoryRepository productCategoryRepository) {
		super();
		this.productRepository = productRepository;
		this.productImageRepository = productImageRepository;
		this.productCategoryRepository = productCategoryRepository;
	}

	public Product addProduct(ProductDTO productDTO) {
		ProductCategory productCategory =  productCategoryRepository.findByName(productDTO.getCategory()).orElseThrow(() -> new RuntimeException("Invalid category."));
		
		Product product = new Product();
		product.setName(productDTO.getName());
		product.setDescription(productDTO.getDescription());
		product.setPrice(Double.parseDouble(productDTO.getPrice()));
		product.setStock(productDTO.getStock());
		product.setCategory(productCategory);
		product.setCreated_at(LocalDateTime.now());
		product.setUpdated_at(LocalDateTime.now());
		
		product = productRepository.save(product);
		
		
		ProductImage productImage = new ProductImage();
		
		productImage.setProduct(product);
		productImage.setUrl(productDTO.getUrl());
		
		productImage = productImageRepository.save(productImage);
		
		return product;
		
	}
	
}
