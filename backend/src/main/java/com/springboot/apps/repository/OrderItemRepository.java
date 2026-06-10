package com.springboot.apps.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.apps.entity.OrderItem;


@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
	@Query("SELECT o FROM OrderItem o WHERE o.order.id = :orderId")
	List<OrderItem> findByOrder_Id(int orderId);
	
	@Query("SELECT o from OrderItem o where o.order.user.id = :userId AND o.order.status = 'SUCCESS'")
	List<OrderItem> findAllSuccessfulOrdersByUserId(int userId);
	
}
