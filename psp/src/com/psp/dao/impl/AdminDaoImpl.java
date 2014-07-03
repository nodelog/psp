package com.psp.dao.impl;

import com.psp.dao.AdminDao;
import com.psp.util.FinalUtil;
import com.psp.web.domain.Admin;

public class AdminDaoImpl extends BaseDao<Admin> implements AdminDao{

	public Admin findAdminByName(String name) {
		return super.findEntityByName(name, FinalUtil.ADMIN);
	}

	public Admin findAdminById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

}
