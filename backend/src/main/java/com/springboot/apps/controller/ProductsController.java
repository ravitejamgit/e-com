package com.springboot.apps.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.springboot.apps.entity.Product;
import com.springboot.apps.entity.User;
import com.springboot.apps.repository.ProductImageRepository;
import com.springboot.apps.service.ProductsService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProductsController {
	
	ProductsService productsService;

	public ProductsController(ProductsService productsService, ProductImageRepository productImageRepository) {
		super();
		this.productsService = productsService;
	}



	@GetMapping("/")
	public ResponseEntity<Map<String, Object>> get(@RequestParam(required = false) String category, HttpServletRequest request) {
		try {
			
			User authenticatedUser = (User) request.getAttribute("authenticatedUser");
			System.out.println(authenticatedUser);
			if(authenticatedUser == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized access"));
			}
			
			List<Product> products = productsService.getProductsByCategory(category);
			
			Map<String, Object> response = new HashMap<>();
			
			Map<String, String> userInfo = new HashMap<>();
			userInfo.put("name", authenticatedUser.getUsername());
			userInfo.put("role", authenticatedUser.getRole().getName());
			
			List<Map<String, Object>> productList = new ArrayList<>();
			for(Product product : products) {
				Map<String, Object> productDetails = new HashMap<>();
				productDetails.put("product_id", product.getId());
				productDetails.put("name", product.getName());
				productDetails.put("description", product.getDescription());
				productDetails.put("price", product.getPrice());
				productDetails.put("stock", product.getStock());
				productDetails.put("images", productsService.getProductImage(product.getId()));
				
				productList.add(productDetails);
			}
			
			response.put("user", userInfo);
			response.put("products", productList);
			System.out.println(response);
			return ResponseEntity.ok().body(response);
			
		}
		
		catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
		
		
	}
	
}
