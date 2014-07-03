package com.psp.service.impl;

import java.util.List;

import com.psp.dao.NeedDao;
import com.psp.service.NeedService;
import com.psp.util.Page;
import com.psp.web.domain.Need;

public class NeedServiceImpl implements NeedService {
	private NeedDao needDao;
	public void setNeedDao(NeedDao needDao) {
		this.needDao = needDao;
	}
	public Need findNeedByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Need findNeedById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public String addNeed(Need need) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Need> listPaging(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteNeed(Need need) {
		// TODO Auto-generated method stub
		
	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateNeed(Need need, int id) {
		// TODO Auto-generated method stub
		
	}

}
