package com.springboot.apps.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.apps.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer>{
	ProductImage findByProduct_id(int id);
}
