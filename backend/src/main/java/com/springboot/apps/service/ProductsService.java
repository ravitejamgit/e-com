package com.springboot.apps.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.apps.entity.Product;
import com.springboot.apps.entity.ProductCategory;
import com.springboot.apps.repository.ProductCategoryRepository;
import com.springboot.apps.repository.ProductImageRepository;
import com.springboot.apps.repository.ProductRepository;

@Service
public class ProductsService {
	
	ProductRepository productRepository;
	
	ProductImageRepository productImageRepository;
	
	ProductCategoryRepository productCategoryRepository;
	
	
	public ProductsService(ProductRepository productRepository, ProductImageRepository productImageRepository,
			ProductCategoryRepository productCategoryRepository) {
		super();
		this.productRepository = productRepository;
		this.productImageRepository = productImageRepository;
		this.productCategoryRepository = productCategoryRepository;
	}
	
	
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	

	public String getProductImage(int id) {
		return productImageRepository.findByProduct_id(id).getUrl();
	}

	public List<Product> getProductsByCategory(String category) {
		
		if(category != null && !category.equalsIgnoreCase("all")) {
			ProductCategory productCategory = productCategoryRepository.findByName(category.toLowerCase()).orElseThrow(() -> new RuntimeException("Category not found.."));
			
			return productRepository.findByCategory_id(productCategory.getId());
		}
		
		return productRepository.findAll();
	}
	
}
