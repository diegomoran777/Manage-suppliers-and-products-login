package com.diego.spring.backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
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

import com.diego.spring.backend.model.Supplier;
import com.diego.spring.backend.service.GeneralService;

@RestController
@RequestMapping("/api/supplier")
@CrossOrigin(origins = {"*"})
public class ControllerRestSupplier {
	
	
	@Autowired
	GeneralService service;
	
	/**
	 * Get all suppliers
	 * @return {@link List}
	 */
	@GetMapping("/suppliers")
	public List<Supplier> getSuppliers(){
		return service.findAllSuppliers();
	}
	
	/**
	 * Get supplier by id
	 * @param supplier {@link RequestBody}}
	 * @return {@link List}
	 */
	@PostMapping("/getsupplierid")
	public List<Supplier> getSupplierById(@RequestBody Supplier supplier){
		return Arrays.asList(service.findSupplierById(supplier.getId()));
	}
	
	/**
	 * Get supplier by id
	 * @param supplier {@link RequestBody}
	 * @return {@link Supplier}
	 */
	@PostMapping("/get-supplier")
	public Supplier getSupplier(@RequestBody Supplier supplier){
		return service.findSupplierById(supplier.getId());
	}
	
	/**
	 * Delete supplier by id
	 * @param id
	 * @return {@link ResponseEntity}
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteSupplierById(@PathVariable long id){
		return service.deleteProductsFromSupplier(id) ? service.deleteSupplierById(id) : ResponseEntity.ok().body(false); 
	}
	
	/**
	 * Save or update supplier
	 * @param supplier
	 * @return {@link ResponseEntity}
	 */
	@PostMapping("/save-update")
	public ResponseEntity<Supplier> saveUpdateSupplier(Supplier supplier){
		return ResponseEntity.ok().body(service.saveUpdateSupplier(supplier));
	}
	
	/**
	 * Get supplier by supplier parameters
	 * @param {@link {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/search-by-params")
	public List<Supplier> getSuppliersByParams(@RequestBody Map<String, String> response) {
		return service.getSuppliersByParams(response.get("searchByName"), response.get("searchByNumberExtern"));
	}
	
}
