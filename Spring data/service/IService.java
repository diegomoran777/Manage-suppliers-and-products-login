package com.diego.spring.backend.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.diego.spring.backend.model.Product;
import com.diego.spring.backend.model.Supplier;
import com.diego.spring.backend.model.UserProgram;

public interface IService {

	public Set<String> getAllTypes();
	
	public Set<String> getTypesBySupplier(long supplierId);
	
	public ResponseEntity<?> deleteSupplierById(long id);
	
	public ResponseEntity<?> deleteProductById(long id);
	
	public ResponseEntity<?> deleteUserById(long id);
	
	public boolean deleteProductsFromSupplier(long id);
	
	public List<Supplier> findAllSuppliers();
	
	public List<Product> findAllProducts();
	
	public List<UserProgram> findAllUsers();
	
	public boolean existsUserByName(String userName);
	
	public Supplier findSupplierById(long id);
	
	public Product findProductById(long id);
	
	public UserProgram findUserByUserName(String userName);
	
	public List<Product> findProductsBySupplierId(long id);
	
	public Product findProductsBySupplierAndProductId(long supplierId,  long id);
	
	public Supplier saveUpdateSupplier(Supplier supplier);
	
	public Product saveUpdateProduct(Product product);
	
	public UserProgram saveUpdateUser(UserProgram user);
	
	public List<Supplier> getSuppliersByParams(String name, String numberExtern);
	
	public List<Product> getProductByParamsId(String name, String numberExtern, String type, String id);
	
	public List<UserProgram> getUsersByParams(String userName, String role);
}
