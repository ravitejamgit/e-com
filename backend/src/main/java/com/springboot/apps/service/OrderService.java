package com.springboot.apps.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.springboot.apps.entity.OrderItem;
import com.springboot.apps.entity.ProductImage;
import com.springboot.apps.repository.OrderItemRepository;
import com.springboot.apps.repository.ProductImageRepository;

@Service
public class OrderService {
	
	OrderItemRepository orderItemRepository;
	
	ProductImageRepository productImageRepository;
	



	public OrderService(OrderItemRepository orderItemRepository, ProductImageRepository productImageRepository) {
		super();
		this.orderItemRepository = orderItemRepository;
		this.productImageRepository = productImageRepository;
	}




	public List<Map<String, Object>> fetchAllOrdersByUserId(int userId) {
		List<OrderItem> orderItems = orderItemRepository.findAllSuccessfulOrdersByUserId(userId);
		
		
		List<Map<String, Object>> products = new ArrayList<>();
		for(var item : orderItems) {
			Map<String, Object> productDetails = new HashMap<>();
			ProductImage image = productImageRepository.findByProduct_id(item.getProduct().getId());
			productDetails.put("order_id", item.getOrder().getId());
			productDetails.put("ordered_date", item.getOrder().getCreated_at());
			productDetails.put("quantity", item.getQuantity());
			productDetails.put("price_per_unit", item.getPricePerUnit());
			productDetails.put("total_price", item.getTotalPrice());
			productDetails.put("product_id", item.getProduct().getId());
			productDetails.put("name", item.getProduct().getName());
			productDetails.put("description", item.getProduct().getDescription());
			productDetails.put("image", image.getUrl());
			
			products.add(productDetails);
		}
		
		
		return products;
	}
}
