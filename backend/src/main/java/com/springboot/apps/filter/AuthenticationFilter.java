package com.springboot.apps.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import com.springboot.apps.entity.User;
import com.springboot.apps.repository.UserRepository;
import com.springboot.apps.service.JWTService;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebFilter(urlPatterns = "/api/*")
public class AuthenticationFilter implements Filter {
	

	private final JWTService jwtService;
	
	private final UserRepository userRepository;
	
	public AuthenticationFilter(JWTService jwtService, UserRepository userRepository) {
		this.jwtService = jwtService;
		this.userRepository = userRepository;
	}


	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// Request and Response Casting
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		if(httpRequest.getRequestURI().equals("/api/users/register") || httpRequest.getRequestURI().equals("/api/auth/login") || httpRequest.getRequestURI().equals("/api/admin/addproduct")) {
			chain.doFilter(request, response);
			return;
		}
		
		httpResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
		httpResponse.setHeader("Access-Control-Allow-Credentials", "true"); // Required since you use Cookies
		httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
		if(httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
			httpResponse.setStatus(HttpServletResponse.SC_OK);
			return;
		}
		
		String token = getAuthTokenFromCookies(httpRequest);		
		if(token == null || !jwtService.validateToken(token)) {
			httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			httpResponse.getWriter().write("Unauthorized: Invalid or missing token");
			return;
		}
		
		String username = jwtService.extractUsernameFromToken(token);
		Optional<User> user = userRepository.findByUsername(username);
		System.out.println(user);
		if(user.isEmpty()) {
			httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			httpResponse.getWriter().write("Unauthorized: User not found.");
			return;
		}
		
		httpRequest.setAttribute("authenticatedUser", user.get());
		System.out.println(httpRequest.getAttribute("authenticatedUser"));
		chain.doFilter(request, response);
		
	}
	
	
	private String getAuthTokenFromCookies(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies != null) {
			return Arrays.stream(cookies)
					.filter(cookie -> "accessToken".equals(cookie.getName()))
					.map(Cookie::getValue)
					.findFirst()
					.orElse(null);
		}
		return null;
	}

}
