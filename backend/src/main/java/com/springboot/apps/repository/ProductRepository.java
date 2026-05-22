package com.springboot.apps.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.apps.entity.Product;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Integer> {
	List<Product> findByCategory_id(int categoryId);
}
