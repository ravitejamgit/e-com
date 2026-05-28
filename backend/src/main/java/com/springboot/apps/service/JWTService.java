package com.springboot.apps.service;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

/*
 * Service for JWT
 * The generated secret key is from byte[] to text.
 * we store it in properties.
 * when application started, we pull the text form properties and decode it to get byte[], 
 * with which we can perform token generation.
 * The decoding process in defined in init().
 * generate() will create and return token*/

@Service
public class JWTService {
	
	private final ProductsService productsService;

	@Value("${jwt.secret}")
	private String secretKey;
	
	private Key key;

	JWTService(ProductsService productsService) {
		this.productsService = productsService;
	}
	
	@PostConstruct
	public void init() {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}
	
	
	public String generateToken(String username, String role) {
		return Jwts.builder()
				.setSubject(username)
				.claim("role", role)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + (1 * 60 * 60 * 1000)))
				.signWith(key)
				.compact();
	}


	public String extractUsernameFromToken(String token) {
		
		Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
		//System.out.println("Extracting username : " + claims.getSubject());
		return claims.getSubject();
	}


	public boolean validateToken(String token) {
		try {
			Jwts.parser()
			.setSigningKey(key).parseClaimsJws(token);
			return true;
		}
		catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	
}
