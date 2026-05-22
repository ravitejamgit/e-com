package com.springboot.apps.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.apps.entity.Product;
import com.springboot.apps.service.ProductsService;

@Controller
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductsController {
	
	ProductsService productsService;

	public ProductsController(ProductsService productsService) {
		super();
		this.productsService = productsService;
	}



	@GetMapping("/all")
	public ResponseEntity<List<Map<String, Object>>> getAll() {
		try {
			List<Map<String, Object>> responseBody = new ArrayList<>();
			
			// Fetching products
			List<Product> products = productsService.getAllProducts();
			
			for(Product product : products) {
				Map<String, Object> each = new HashMap<>();
				each.put("Name", product.getName());
				each.put("Description", product.getDescription());
				each.put("Price", product.getPrice());
				each.put("Stock", product.getStock());
				each.put("Category", product.getCategory());
				each.put("created_at", product.getCreated_at());
				each.put("Updated_at", product.getUpdated_at());
				each.put("Images", productsService.getProductImage(product.getId()));
				
				responseBody.add(each);
				
				System.out.println(responseBody);
			}
			
			return ResponseEntity.ok(responseBody);
			
		}
		
		catch(RuntimeException e) {
			ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
		
		
		
		return null;
	}
	
}
