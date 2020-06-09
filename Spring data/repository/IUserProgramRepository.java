package com.diego.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.diego.spring.backend.model.Supplier;
import com.diego.spring.backend.model.UserProgram;

/**
 * Interface of User repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface IUserProgramRepository extends JpaRepository<UserProgram, Long> {
	/**
	 * Returns a user list by userName
	 * @return list userProgram
	 */
	List<UserProgram> findByOrderByUserName();
	
	/**
	 * Returns a userProgram by user id
	 * @return UserProgram
	 * @param id
	 */
	UserProgram findById(long id);
	
	/**
	 * Returns a userProgram by userName
	 * @return UserProgram
	 * @param userName
	 */
	UserProgram findByUserName(String userName);
	
	/**
	 * Verify if a user exists by userName
	 * @return boolean
	 * @param userName
	 */
	boolean existsUserProgramByUserName(String userName);
	
	/**
	 * Returns a userProgram list by specific parameters
	 * @return UserProgram list
	 * @param userName
	 * @param role
	 */
	@Query("SELECT m FROM UserProgram m WHERE m.userName LIKE %:userName% AND m.role LIKE %:role%")
	List<UserProgram> searchByTwoParams(@Param("userName") String userName, @Param("role") String role);
}
