package com.springboot.apps.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.apps.entity.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer>{
	Optional<ProductCategory> findByName(String name);
}
