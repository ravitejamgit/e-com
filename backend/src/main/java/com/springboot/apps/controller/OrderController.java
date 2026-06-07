package com.springboot.apps.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.apps.entity.User;
import com.springboot.apps.repository.UserRepository;
import com.springboot.apps.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("api/orders")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class OrderController {
	
	UserRepository userRepository;
	OrderService orderService;
	
	
	public OrderController(UserRepository userRepository, OrderService orderService) {
		super();
		this.userRepository = userRepository;
		this.orderService = orderService;
	}


	@GetMapping("/") 
	public ResponseEntity<?> getAllOrders(HttpServletRequest request) {
		try {
			User user = (User) request.getAttribute("authenticatedUser");
			System.out.println(user);
			if(user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not found."));
			}
			
			List<Map<String, Object>> products = orderService.fetchAllOrdersByUserId(user.getId());
			Map<String, Object> response = new HashMap<>();
			response.put("user", Map.of("name", user.getUsername(), "email", user.getEmail(), "role", user.getRole().getName()));
			response.put("products", products);
			response.put("products_count", products.size());
			
			return ResponseEntity.ok(response);
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
	
}
