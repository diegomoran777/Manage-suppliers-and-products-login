package com.diego.spring.backend.dto;

import java.util.Set;
import java.util.TreeSet;

/**
 * Class that returns the types products
 * @author Diego Moran
 * @version: 1.0
 */
public class Types {
	
	Set<String> types = new TreeSet<>();

	public Set<String> getTypes() {
		return types;
	}
	
}
