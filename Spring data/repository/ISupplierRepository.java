package com.diego.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.diego.spring.backend.model.Supplier;

/**
 * Interface of Supplier repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface ISupplierRepository extends JpaRepository<Supplier, Long> {
	/**
	 * Returns a supplier by supplierId
	 * @return Supplier
	 * @param id
	 */
	Supplier findById(long id);
	
	/**
	 * Returns a supplier list by specific parameters
	 * @return List suppliers
	 * @param name
	 * @param numberExtern
	 */
	@Query("SELECT m FROM Supplier m WHERE m.name LIKE %:name% AND m.numberExtern LIKE %:numberExtern%")
	List<Supplier> searchByTwoParams(@Param("name") String name, @Param("numberExtern") String numberExtern);
}
