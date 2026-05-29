package com.springboot.apps.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springboot.apps.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
	// select * from cartItems where user_id = :userId and product_id = :productId;
	Optional<Cart> findByUser_IdAndProduct_Id(int userId, int productId);
	
	
	List<Cart> findAllByUser_Id(int userId);
	
	@Query("select coalesce(sum(c.quantity), 0) from Cart c where c.user.id = :userId")
	int countByUser(int userId);
}
