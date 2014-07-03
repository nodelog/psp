package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.PublicInterestDao;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.PublicInterest;

/**
 * 
 * @author wangyachao
 * @date 2014-4-21 下午1:48:46
 * @version V1.0
 */
public class PublicInterestDaoImpl extends BaseDao<PublicInterest> implements
		PublicInterestDao {

	public List<PublicInterest> listPaging(Page page) {
		List<PublicInterest> publicInterestList = super.listPaging(page,
				FinalUtil.PUBLICINTEREST, FinalUtil.PUBLIC_DELETE);
		return publicInterestList;
	}

	public Integer getPageTotal(Page page) {
		Integer pageTotal = super.getPageTotal(page, FinalUtil.PUBLICINTEREST,
				FinalUtil.PUBLIC_DELETE);
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
