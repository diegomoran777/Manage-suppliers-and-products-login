package com.diego.spring.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

/**
 * Class entity of Product
 * @author Diego Moran
 * @version: 1.0
 */
@Entity
public class Product implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO, generator="identity")
	@GenericGenerator(name = "identity", strategy = "native")
	private long id;
	
	@Column(name = "numberExtern", length= 70)
	private String numberExtern;
	
	@Column(name = "name", length= 50, nullable = false)
	private String name;
	
	@Column(name = "type", length= 70, nullable = false)
	private String type;
	
	@Column(name = "description", length= 70)
	private String description;
	
	@Column(name = "photo")
	private String photo;
	
	@Column(name = "supplierId")
	private long supplierId;
	
	@Column(name = "supplierName", length= 70)
	private String supplierName;
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNumberExtern() {
		return numberExtern;
	}

	public void setNumberExtern(String numberExtern) {
		this.numberExtern = numberExtern;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(long supplierId) {
		this.supplierId = supplierId;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}
