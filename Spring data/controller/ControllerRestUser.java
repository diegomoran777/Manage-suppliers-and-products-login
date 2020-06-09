package com.diego.spring.backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

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
import com.diego.spring.backend.model.UserProgram;
import com.diego.spring.backend.service.GeneralService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"*"})
public class ControllerRestUser {

	@Autowired
	GeneralService service;
	
	
	/**
	 * Get all users
	 * @return {@link List}
	 */
	@GetMapping("/users")
	public List<UserProgram> getUsers(){
		return service.findAllUsers();
	}
	
	/**
	 * Get users by user name
	 * @param {@link RequestBody}
	 * @return {@link UserProgram}
	 */
	@PostMapping("/getuser")
	public UserProgram getUserByUserName(@RequestBody UserProgram user){
		return service.findUserByUserName(user.getUserName());
	}
	
	/**
	 * Get users by user name
	 * @param {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/get-user")
	public List<UserProgram> getUser(@RequestBody UserProgram user){
		return Arrays.asList(service.findUserByUserName(user.getUserName()));
	}
	
	/**
	 * Verify if the specific user exists
	 * @param {@link RequestBody}
	 * @return {@link ResponseEntity}
	 */
	@PostMapping("/exists")
	public ResponseEntity<?> existsUser(@RequestBody UserProgram user) {
		return ResponseEntity.ok().body(service.existsUserByName(user.getUserName()));
	}
	
	/**
	 * Delete user by id
	 * @param {@link id}
	 * @return {@link ResponseEntity}
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUserById(@PathVariable long id){
		return service.deleteUserById(id);  
	}
	
	/**
	 * Save or update user
	 * @param {@link UserProgam}
	 * @return {@link ResponseEntity}
	 */
	@PostMapping("/save-update")
	public ResponseEntity<UserProgram> saveUpdateUser(UserProgram user){
		return ResponseEntity.ok().body(service.saveUpdateUser(user));
	}
	
	/**
	 * Get users by specific parameters
	 * @param {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/search-by-params")
	public List<UserProgram> getUsersByParams(@RequestBody Map<String, String> response) {
		return service.getUsersByParams(response.get("userName"), response.get("role"));
	}
}
