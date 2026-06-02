package com.springboot.apps.service;

import com.springboot.apps.repository.UserRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import com.springboot.apps.entity.Cart;
import com.springboot.apps.entity.Order;
import com.springboot.apps.entity.OrderItem;
import com.springboot.apps.entity.OrderStatus;
import com.springboot.apps.entity.User;
import com.springboot.apps.repository.CartRepository;
import com.springboot.apps.repository.OrderItemRepository;
import com.springboot.apps.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class PaymentService {
	

	@Value("${razorpay.key_id}")
	private String razorpayKeyId;
	
	@Value("${razorpay.key_secret}")
	private String razorpayKeySecret;
	
	private final UserRepository userRepository;
	private final OrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;
	private final CartRepository cartRepository;
	
	
	public PaymentService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, CartRepository cartRepository, UserRepository userRepository) {
		this.orderRepository = orderRepository;
		this.orderItemRepository = orderItemRepository;
		this.cartRepository = cartRepository;
		this.userRepository = userRepository;
	}
	
	@Transactional
	public String createOrder(User user, BigDecimal totalAmount) throws RazorpayException {
		
		// razorpay client
		RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
		
		// order request
		var orderRequest = new JSONObject();
		orderRequest.put("amount", totalAmount.multiply(BigDecimal.valueOf(100)).intValue());
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "txn_" + System.currentTimeMillis());
		
		com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequest);
		
		orderRepository.save(new Order(
				razorpayOrder.get("id"),
				user,
				totalAmount,
				OrderStatus.PENDING,
				LocalDateTime.now(),
				LocalDateTime.now()
				));
		
		return razorpayOrder.get("id");
	}
	
	@Transactional
	public boolean verifyOrder(User user, String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) throws RazorpayException {
		
		JSONObject json = new JSONObject(Map.of(
				"razorpay_order_id", razorpayOrderId, 
				"razorpay_payment_id", razorpayPaymentId,
				"razorpay_signature", razorpaySignature
		));
		
		boolean verified = Utils.verifyPaymentSignature(json, razorpayKeySecret);
		
		if(verified) {
			System.out.println("verification success");
			// Updating order status to success
			Order order = orderRepository.findById(razorpayOrderId).orElseThrow(() -> new RuntimeException("Order details not found."));
			order.setStatus(OrderStatus.SUCCESS);
			order.setUpdated_at(LocalDateTime.now());
			orderRepository.save(order);
			
			
			List<Cart> cartItems = cartRepository.findAllByUser_Id(user.getId());
			
			
			for(Cart each : cartItems) {
				orderItemRepository.save(new OrderItem(
						order,
						each.getProduct(),
						each.getQuantity(),
						BigDecimal.valueOf(each.getProduct().getPrice()),
						BigDecimal.valueOf(each.getProduct().getPrice()).multiply(BigDecimal.valueOf(each.getQuantity()))
				));
			}
			
			cartRepository.deleteAllByUser_Id(user.getId());
			
			return verified;
		}
		
		return false;
	}
	
	
	public String getKeyId() {
		return razorpayKeyId;
	}
	
	
}
