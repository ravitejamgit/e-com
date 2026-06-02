package com.springboot.apps.controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.apps.entity.User;
import com.springboot.apps.service.PaymentService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PaymentController {
	
	PaymentService paymentService;
	
	
	
	public PaymentController(PaymentService paymentService) {
		this.paymentService = paymentService;
	}



	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Map<String, Object> requestBody, HttpServletRequest request) {
		try {
			
			User user = (User) request.getAttribute("authenticatedUser");
			if(user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user.."));
			}
			//System.out.println(requestBody.get("total_amount"));
			String orderId = paymentService.createOrder(user, new BigDecimal(requestBody.get("total_amount").toString()));
			if(orderId == null) {
				throw new RuntimeException("Error while creating order id.");
			}
			int amount = new BigDecimal(requestBody.get("total_amount").toString()).multiply(BigDecimal.valueOf(100)).intValue();
			return ResponseEntity.ok(Map.of("Status", "Success", "order_id", orderId, "key_id", paymentService.getKeyId(), "amount", amount));
			
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
	
	
	@PostMapping("/verify")
	public ResponseEntity<?> verify(@RequestBody Map<String, Object> requestBody, HttpServletRequest request) {
		try {
			
			User user = (User) request.getAttribute("authenticatedUser");
			if(user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user.."));
			}
			
			String razorpayOrderId = (String) requestBody.get("razorpay_order_id");
			String razorpayPaymentId = (String) requestBody.get("razorpay_payment_id");
			String razorpaySignature = (String) requestBody.get("razorpay_signature");
			
			if(paymentService.verifyOrder(user, razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
				return ResponseEntity.ok(Map.of("message", "Payment verification successful."));
			}
			else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Payment Verification failed."));
			}
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
	
}
