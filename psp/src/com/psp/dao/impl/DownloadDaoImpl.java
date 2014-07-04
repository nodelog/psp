package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.DownloadDao;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Download;
import com.psp.web.domain.User;

public class DownloadDaoImpl extends BaseDao<Download> implements DownloadDao {

	public void addDownload(Download download) {
		super.addEntity(download);
	}

	@SuppressWarnings("unchecked")
	public List<Download> listPaging(Page page) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Download as e where e.status!=:status order by downloadTime desc";
		query = session.createQuery(hql);
		query.setInteger("status", FinalUtil.DOWNLOAD_DELETE);
		query.setFirstResult(index);
		query.setMaxResults(page.getEach());
		List<Download> objectList = query.list();
		return objectList;
	}

	@SuppressWarnings("unchecked")
	public List<Download> listPaging(Page page, User user) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Download as e where e.user=:user and e.status!=:status order by downloadTime desc";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setInteger("status", FinalUtil.DOWNLOAD_DELETE);
		query.setFirstResult(index);
		query.setMaxResults(page.getEach());
		List<Download> objectList = query.list();
		return objectList;
	}

	public Integer getPageTotal(Page page) {
		init();
		hql = "select count(*) from Download e where e.status!=:status";
		query = session.createQuery(hql);
		query.setInteger("status", FinalUtil.DOWNLOAD_DELETE);
		Long count = (Long) query.uniqueResult();
		return count != null ? count.intValue() : 0;
	}

	public Integer getPageTotal(Page page, User user) {
		init();
		hql = "select count(*) from Download e where e.user=:user and e.status!=:status";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setInteger("status", FinalUtil.DOWNLOAD_DELETE);
		Long count = (Long) query.uniqueResult();
		return count != null ? count.intValue() : 0;
	}

}
