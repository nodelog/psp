package com.psp.web.domain;


/**
 * 类名称：Admin 类描述：管理员实体 创建人：王亚超 创建时间：2014-3-7 下午11:18:26
 * 
 * @version 1.0
 */
public class Admin extends BaseDomain {

	
	private static final long serialVersionUID = 851357141748583119L;
	private String name;
	private String password;

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	

}
