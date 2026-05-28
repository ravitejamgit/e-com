package com.springboot.apps.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.apps.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer>{
	ProductImage findByProduct_id(int id);
}
