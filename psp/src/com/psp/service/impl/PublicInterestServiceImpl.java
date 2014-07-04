package com.psp.service.impl;

import java.util.List;

import com.psp.dao.PublicInterestDao;
import com.psp.service.PublicInterestService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.PublicInterest;

/**
 * 类名称：PublicInterestServiceImpl
 * 类描述：PublicInterestServiceImpl
 * 创建人：王亚超
 * 创建时间：2014-3-30 下午9:32:23
 * @version 1.0
 */
public class PublicInterestServiceImpl implements PublicInterestService{
	private PublicInterestDao publicInterestDao;
	public void setPublicInterestDao(PublicInterestDao publicInterestDao) {
		this.publicInterestDao = publicInterestDao;
	}
	
	public List<PublicInterest> listPaging(Page page) {
		page.setEach(FinalUtil.PAGE_EACH);
		List<PublicInterest> listData = publicInterestDao.listPaging(page);
		return listData;
	}

	
	public Integer getPageTotal(Page page) {
		page.setEach(FinalUtil.PAGE_EACH);
		Integer pageTotal = publicInterestDao.getPageTotal(page);
		return pageTotal;
	}

	public PublicInterest findPublicInterestByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public PublicInterest findPublicInterestById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public String addPublicInterest(PublicInterest publicInterest) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deletePublicInterest(PublicInterest publicInterest) {
		// TODO Auto-generated method stub
		
	}

	
	
}
