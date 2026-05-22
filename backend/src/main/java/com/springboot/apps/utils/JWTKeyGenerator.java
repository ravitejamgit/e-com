package com.springboot.apps.utils;

import javax.crypto.SecretKey;

import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

public class JWTKeyGenerator {
	public static String generate() {
		 SecretKey key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512);
		 return Encoders.BASE64.encode(key.getEncoded());
	}
	
//	public static void main(String args[]) {
//		System.out.println("JWT Secret Key Generator...");
//		System.out.println("Generated Key : " + generate());
//	}
}
