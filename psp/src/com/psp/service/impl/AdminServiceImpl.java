package com.psp.service.impl;

import com.psp.dao.AdminDao;
import com.psp.service.AdminService;
import com.psp.util.MD5;
import com.psp.web.domain.Admin;

public class AdminServiceImpl implements AdminService{
	private AdminDao adminDao;
	public void setAdminDao(AdminDao adminDao) {
		this.adminDao = adminDao;
	}
	public Admin findAdminByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Admin findAdminById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}
	public Admin login(Admin admin) {
		Admin adminDb = adminDao.findAdminByName(admin.getName());
		if(adminDb==null){
			return null;
		}
		String password = MD5.getMD5Str(admin.getPassword());
		String passwordDb = adminDb.getPassword();
		if(passwordDb.equals(password)){
			return adminDb;
		}
		return null;
	}

}
