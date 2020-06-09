package com.diego.spring.backend.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

/**
 * Class entity of Supplier
 * @author Diego Moran
 * @version: 1.0
 */
@Entity
public class Supplier implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO, generator="identity")
	@GenericGenerator(name = "identity", strategy = "native")
	private long id;
	
	@Column(name = "numberExtern", length= 70)
	private String numberExtern;
	
	@Column(name = "name", length= 50, nullable = false)
	private String name;
	
	@Column(name = "address", length= 70)
	private String address;
	
	@Column(name = "telephone", length= 30)
	private String telephone;
	
	@Column(name = "email", length= 50, nullable = false)
	private String email;


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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

}
