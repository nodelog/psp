package com.psp.web.domain;

import java.io.Serializable;

/**
 * 类名称：BaseDomain 类描述：所有实体的父类 创建人：王亚超 创建时间：2014-3-12 下午6:44:12
 * 
 * @version 1.0
 */
public class BaseDomain implements Serializable {

	private static final long serialVersionUID = 2061811222032483021L;
	public Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
