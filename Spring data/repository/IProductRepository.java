package com.diego.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.diego.spring.backend.model.Product;

/**
 * Interface of product repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface IProductRepository extends JpaRepository<Product, Long> {
	/**
	 * Returns list of suppliers by supplierId
	 * @return List
	 * @param id
	 */
	List<Product> findBySupplierId(long id);
	
	/**
	 * Returns a product by supplierId and productId
	 * @return Product
	 * @param supplierId
	 * @param id
	 */
	Product findBySupplierIdAndId(long supplierId, long id);
	
	/**
	 * Returns a product by productId
	 * @return Product
	 * @param id
	 */
	Product findById(long id);
	
	/**
	 * Delete all product with sepecific supplierId
	 * @return Long
	 * @param id
	 */
	Long deleteBySupplierId(long id);
	
	/**
	 * Search products by specific parameters
	 * @return List
	 * @param name
	 * @param numberExtern
	 * @param type
	 * @param supplierId
	 */
	@Query("SELECT m FROM Product m WHERE m.name LIKE %:name% AND m.numberExtern LIKE %:numberExtern% AND m.type LIKE %:type% AND CAST( m.supplierId AS string) LIKE %:supplierId%")
	List<Product> searchByThreeParams(@Param("name") String name, @Param("numberExtern") String numberExtern, @Param("type") String type, @Param("supplierId") String supplierId);
}
