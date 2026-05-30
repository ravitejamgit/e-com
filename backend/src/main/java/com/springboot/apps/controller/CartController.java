package com.springboot.apps.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.apps.entity.Cart;
import com.springboot.apps.entity.User;
import com.springboot.apps.service.CartService;
import com.springboot.apps.service.UserService;

import jakarta.servlet.http.HttpServletRequest;


@Controller
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CartController {
	
	private UserService userService;
	
	private CartService cartService;

	public CartController(UserService userService, CartService cartService) {
		super();
		this.userService = userService;
		this.cartService = cartService;
	}
	
	@GetMapping("/")
	public ResponseEntity<Map<String, Object>> getAll(HttpServletRequest request) {
		try {
			User user = (User) request.getAttribute("authenticatedUser");
			Map<String, Object> response = cartService.fetchItems(user.getId());
			response.put("user", Map.of("username", user.getUsername(), "role", user.getRole()));
			return ResponseEntity.ok(response);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		}
	}
	
	
	@PostMapping("/add")
	public ResponseEntity<?> add(@RequestBody Map<String, Object> requestBody, HttpServletRequest request) {
		try {
			int productId = (int) requestBody.get("productId");
			int quantity = requestBody.containsKey("quantity") ? (int)requestBody.get("quantity") : 1;
			
			User user = (User) request.getAttribute("authenticatedUser");
			
			if(user == null) {
				throw new RuntimeException("User not found..");
			}
			
			Cart cartResponse = cartService.addToCart(user.getId(), productId, quantity);
			
			return ResponseEntity.status(HttpStatus.CREATED).body("Added to cart.");
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody Map<String, Object> requestBody, HttpServletRequest request) {
		try {
			
			if(!requestBody.containsKey("productId") || !requestBody.containsKey("quantity")) {
				throw new RuntimeException("Insufficient request parameters..");
			}
			
			User user = (User) request.getAttribute("authenticatedUser");
			if(user == null) {
				throw new RuntimeException("User not found.");
			}
			
			String message = cartService.updateQuantity(user.getId(), (int) requestBody.get("productId"), (int) requestBody.get("quantity"));
			
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		}
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody Map<String, Object> requestBody, HttpServletRequest request) {
		try {
			if(!requestBody.containsKey("productId")) {
				throw new RuntimeException("Insufficient request parameters..");
			}
			
			User user = (User) request.getAttribute("authenticatedUser");
			if(user == null) {
				throw new RuntimeException("User not found..");
			}
			
			return ResponseEntity.ok(cartService.deleteFromCart(user.getId(), (int) requestBody.get("productId")));
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		}
	}
	
	
	@GetMapping("/count")
	public ResponseEntity<?> count(HttpServletRequest request) {
		try {
			User user = (User) request.getAttribute("authenticatedUser");
			return ResponseEntity.ok(Map.of("count", cartService.getItemsCount(user.getId())));
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		}
	}
	
}
