package com.diego.spring.backend.service;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.diego.spring.backend.dto.Types;
import com.diego.spring.backend.model.Product;
import com.diego.spring.backend.model.Supplier;
import com.diego.spring.backend.model.UserProgram;
import com.diego.spring.backend.repository.IProductRepository;
import com.diego.spring.backend.repository.ISupplierRepository;
import com.diego.spring.backend.repository.IUserProgramRepository;

/**
 * Class that manages the functions of the repositories 
 * @author Diego Moran
 * @version: 1.0
 */
@Service
@Transactional
public class GeneralService implements IService {
	
	@Autowired
	ISupplierRepository repoSupplier;
	
	@Autowired
	IProductRepository repoProduct;
	
	@Autowired
	IUserProgramRepository repoUser;
	
	private Types types = new Types();
	

	/**
	 * Returns all types products
	 * @return Set of types
	 */
	@Override 
	public Set<String> getAllTypes() {
		this.types.getTypes().clear();
		//return repoProduct.findAll().stream().map(p -> p.getType()).collect(Collectors.toSet());
		repoProduct.findAll().forEach(product -> this.types.getTypes().add(product.getType())); 
		return this.types.getTypes();
	}

	/**
	 * Returns specific types products
	 * @return Set of types
	 * @param supplierId
	 */
	@Override 
	public Set<String> getTypesBySupplier(long supplierId) {
		this.types.getTypes().clear();
		//return repoProduct.findBySupplierId(supplierId).stream().map(p -> p.getType()).collect(Collectors.toSet());
		repoProduct.findBySupplierId(supplierId).forEach(product -> this.types.getTypes().add(product.getType()));
		return this.types.getTypes();
	}

	/**
	 * Returns a boolean value if can delete a supplier by id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override 
	public ResponseEntity<?> deleteSupplierById(long id) {
		try {
			repoSupplier.deleteById(id);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			System.out.println("fallo");
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Returns a boolean value if can delete a product by id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override 
	public ResponseEntity<?> deleteProductById(long id) {
		try {
			repoProduct.deleteById(id);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}
	
	/**
	 * Returns a boolean value if can delete all product by supplier id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override 
	public boolean deleteProductsFromSupplier(long id) {
		try {
			repoProduct.deleteBySupplierId(id);
			return true;
		} catch (Exception e) {
			System.out.println("Fallo borrar productos de un supplier");
			return false;
		}
	}

	/**
	 * Returns a boolean value if can delete a user by id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override 
	public ResponseEntity<?> deleteUserById(long id) {
		try {
			repoUser.deleteById(id);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Returns all suppliers
	 * @return List of suppliers
	 */
	@Override 
	public List<Supplier> findAllSuppliers() {
		return repoSupplier.findAll();
	}

	/**
	 * Returns all products
	 * @return List of products
	 */
	@Override 
	public List<Product> findAllProducts() {
		return repoProduct.findAll();
	}

	/**
	 * Returns all users
	 * @return List of users
	 */
	@Override 
	public List<UserProgram> findAllUsers() {
		return repoUser.findByOrderByUserName();
	}

	/**
	 * Returns a supplier by id
	 * @return Supplier
	 * @param id
	 */
	@Override 
	public Supplier findSupplierById(long id) {
		return repoSupplier.findById(id);
	}

	/**
	 * Returns a product by id
	 * @return Product
	 * @param id
	 */
	@Override 
	public Product findProductById(long id) {
		return repoProduct.findById(id);
	}

	/**
	 * Returns a userProgram by userName
	 * @return UserProgram
	 * @param userName
	 */
	@Override 
	public UserProgram findUserByUserName(String userName) {
		return repoUser.findByUserName(userName);
	}

	/**
	 * Returns a list of products by supplierId
	 * @return UserProgram list
	 * @param id
	 */
	@Override 
	public List<Product> findProductsBySupplierId(long id) {
		return repoProduct.findBySupplierId(id);
	}
	
	/**
	 * Returns a product by supplierId and productId
	 * @return Product
	 * @param supplierId
	 * @param id
	 */
	@Override 
	public Product findProductsBySupplierAndProductId(long supplierId,  long id) {
		return repoProduct.findBySupplierIdAndId(supplierId, id);
	}

	/**
	 * Returns a supplier which will be deleted
	 * @return Supplier
	 * @param supplier
	 */
	@Override 
	public Supplier saveUpdateSupplier(Supplier supplier) {
		return repoSupplier.save(supplier);
	}

	/**
	 * Returns a product which will be deleted
	 * @return Product
	 * @param product
	 */
	@Override 
	public Product saveUpdateProduct(Product product) {
		return repoProduct.save(product);
	}

	/**
	 * Returns a userProgram which will be deleted
	 * @return UserProgram
	 * @param user
	 */
	@Override
	public UserProgram saveUpdateUser(UserProgram user) {
		return repoUser.save(user);
	}

	/**
	 * Returns a supplier list by parameters
	 * @return Supplier list
	 * @param name
	 * @param numberExtern
	 */
	@Override 
	public List<Supplier> getSuppliersByParams(String name, String numberExtern) {
		return repoSupplier.searchByTwoParams(name, numberExtern);
	}

	/**
	 * Returns a product list by parameters
	 * @return Product list
	 * @param name
	 * @param numberExtern
	 * @param type
	 * @param supplierId
	 */
	@Override 
	public List<Product> getProductByParamsId(String name, String numberExtern, String type, String supplierId) {
		return repoProduct.searchByThreeParams(name, numberExtern, type, supplierId);
	}
	
	/**
	 * Returns a userProgram list by parameters
	 * @return userProgram list
	 * @param userName
	 * @param role
	 */
	@Override
	public List<UserProgram> getUsersByParams(String userName, String role) {
		return repoUser.searchByTwoParams(userName, role);
	}

	/**
	 * Verify if exists a user by userName
	 * @return Boolean
	 * @param userName
	 */
	@Override
	public boolean existsUserByName(String userName) {
		return repoUser.existsUserProgramByUserName(userName);
	}
			
}
