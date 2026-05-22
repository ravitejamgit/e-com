package com.springboot.apps.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.apps.dto.ProductDTO;
import com.springboot.apps.entity.Product;
import com.springboot.apps.service.AdminService;

@Controller
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
	
	AdminService adminService;
	
	
	
	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}



	@PostMapping("/addproduct")
	public ResponseEntity<?> addProduct(@RequestBody ProductDTO productDTO) {
		try {
			Product response = adminService.addProduct(productDTO);
			return ResponseEntity.ok().body(Map.of("message", "User successfully added.."));
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		}
	}
	
}
