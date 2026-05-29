package com.springboot.apps.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.apps.entity.Cart;
import com.springboot.apps.entity.Product;
import com.springboot.apps.entity.User;
import com.springboot.apps.repository.CartRepository;
import com.springboot.apps.repository.ProductRepository;
import com.springboot.apps.repository.UserRepository;

@Service
public class CartService {
	
	UserRepository userRepository;

	ProductRepository productRepository;
	
	ProductsService productsService;
	
	CartRepository cartRepository;
	
	
	@Autowired
	public CartService(UserRepository userRepository, ProductRepository productRepository,
			ProductsService productsService, CartRepository cartRepository) {
		super();
		this.userRepository = userRepository;
		this.productRepository = productRepository;
		this.productsService = productsService;
		this.cartRepository = cartRepository;
	}


	public Cart addToCart(int userId, int productId, int quantity) {
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Invalid username.."));

		Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Invalid product id.."));
		
		// Checking if same product is exist in cart for user
		Optional<Cart> inCart = cartRepository.findByUser_IdAndProduct_Id(userId, productId);
		
		Cart cart = null;
		
		// if present, update quantity
		if(inCart.isPresent()) {
			cart = inCart.get();
			cart.setQuantity(cart.getQuantity() + quantity);
		}
		// else new cart entry
		else {
			cart = new Cart(user, product, quantity);
		}
		
		return cartRepository.save(cart);
	}
	
	
	public String deleteFromCart(int userId, int productId) {
		
		Optional<Cart> inCart = cartRepository.findByUser_IdAndProduct_Id(userId, productId);
		
		if(inCart.isPresent()) {
			cartRepository.delete(inCart.get());
			return "deleted successfully..";
		}
		
		return "No entry found..";
		
	}
	
	
	public String updateQuantity(int userid, int productId, int quantity) {
		
		productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found."));
		
		Optional<Cart> inCart = cartRepository.findByUser_IdAndProduct_Id(userid, productId);
		
		if(inCart.isPresent()) {
			if(quantity == 0) {
				deleteFromCart(userid, productId);
			}
			else {
				Cart cart = inCart.get();
				cart.setQuantity(quantity);
				cartRepository.save(cart);
			}
			return "Quantity updated successfully..";
		}
		
		return "No entry found..";
	}
	
	public Map<String, Object> fetchItems(int userId) {

		Map<String, Object> response = new HashMap<>();
		Double totalCheckOutCost = 0d;
		
		
		List<Cart> cartItems = cartRepository.findAllByUser_Id(userId);
		List<Map<String, Object>> items = new ArrayList<>();
		
		
		for(Cart item : cartItems) {
			Double totalCost = 0d;
			Map<String, Object> map = new HashMap<>();
			map.put("name", item.getProduct().getName());
			map.put("description", item.getProduct().getName());
			map.put("id", item.getProduct().getId());
			map.put("price", item.getProduct().getPrice());
			map.put("image", productsService.getProductImage(item.getProduct().getId()));
			map.put("quantity", item.getQuantity());
			map.put("totalCost", (item.getProduct().getPrice() * item.getQuantity()));
			
			totalCheckOutCost += (item.getProduct().getPrice() * item.getQuantity());
			items.add(map);
		}
		
		response.put("items", items);
		response.put("totalCheckOutCost", totalCheckOutCost);
		
		
		return response;
	}
	
	public int getItemsCount(int userId) {
		
		return cartRepository.countByUser(userId);
	}
}
