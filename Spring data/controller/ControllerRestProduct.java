package com.diego.spring.backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diego.spring.backend.dto.BodyRequest;
import com.diego.spring.backend.model.Product;
import com.diego.spring.backend.model.Supplier;
import com.diego.spring.backend.service.GeneralService;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = {"*"})
public class ControllerRestProduct {

	@Autowired
	IService service;
	
	/**
	 * Get all products
	 * @return {@link List}
	 */
	@GetMapping("/products")
	public List<Product> getProducts(){
		return service.findAllProducts();
	}
	
	
	/**
	 * Get product by id
	 * @param product
	 * @return {@link List}
	 */
	@PostMapping("/getproductid")
	public List<Product> getProductById(@RequestBody Product product){
		return Arrays.asList(service.findProductById(product.getId()));
	}
	
	/**
	 * Get product by id
	 * @param product
	 * @return {@link Product}
	 */
	@PostMapping("/get-product")
	public Product getProduct(@RequestBody Product product){
		return service.findProductById(product.getId());
	}
	
	/**
	 * Delete product by id
	 * @param id
	 * @return {@link ResponseEntity}
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProductById(@PathVariable long id){
		return service.deleteProductById(id);  
	}
	
	/**
	 * Get products by supplierId
	 * @param product
	 * @return {@link List}
	 */
	@PostMapping("/bysupplierid")
	public List<Product> getProductsBySupplierID(@RequestBody Product product){
		return service.findProductsBySupplierId(product.getId());
	}
	
	/**
	 * Get product by supplierId and productId
	 * @param product
	 * @return {@link List}
	 */
	@PostMapping("/bysupplier-productid")
	public List<Product> getProductsBySupplierAndProductId(@RequestBody Product product){
		return Arrays.asList(service.findProductsBySupplierAndProductId(product.getSupplierId(), product.getId()));
	}
	
	/**
	 * Save and update product
	 * @param product
	 * @return {@link ResponseEntity<product>}
	 */
	@PostMapping("/save-update")
	public ResponseEntity<Product> saveUpdateProduct(Product product){
		return ResponseEntity.ok().body(service.saveUpdateProduct(product));
	}
	
	/**
	 * Get all types of product
	 * @return {@link Set}
	 */
	@GetMapping("/types")
	public Set<String> getAllTypes(){
		return service.getAllTypes();
	}
	
	/**
	 * Get all types of productId
	 * @param id
	 * @return {@link Set}
	 */
	@GetMapping("/types/{id}")
	public Set<String> getTypesById(@PathVariable long id){
		return service.getTypesBySupplier(id);
	}
	
	/**
	 * Get product by param and supplierId
	 * @param {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/search-by-paramsid")
	public List<Product> getProductsByParamsId(@RequestBody BodyRequest body) {
		System.out.println(body.getSupplierId());
		return service.getProductByParamsId(body.getSearchByName(), body.getSearchByNumberEx(), body.getSearchByType(), body.getSupplierId());
	}
	
}
