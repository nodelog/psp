package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.SoftwareDao;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Software;
import com.psp.web.domain.SoftwareLog;
import com.psp.web.domain.User;

public class SoftwareDaoImpl extends BaseDao<Software> implements SoftwareDao {

	public Software findSoftwareByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Software findSoftwareById(Integer id) {
		Software software = super.getEntityById(new Software(), id);
		return software;
	}

	public Software findSoftwareFileById(Integer id) {
		init();
		hql = "from Software e where e.id=:id and e.status=:status";
		query = session.createQuery(hql);
		query.setInteger("id", id);
		query.setInteger("status", FinalUtil.SOFTWARE_FILE);
		Software software = (Software) query.uniqueResult();
		return software;
	}

	public int addSoftware(Software software) {
		int id = super.addEntity(software);
		return id;
	}

	public List<Software> listPaging(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteSoftware(Software software) {
		// TODO Auto-generated method stub

	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateSoftware(Software software, int id) {
		// TODO Auto-generated method stub

	}

	public Integer getPageTotal(Category category) {
		init();
		hql = "select count(*) from Software e where e.category=:category";
		query = session.createQuery(hql);
		query.setEntity("category", category);
		Long count = (Long) query.uniqueResult();
		return count != null ? count.intValue() : 0;
	}
	
	public Integer getPageTotal(Category category,Integer status) {
		init();
		hql = "select count(*) from Software e where e.category=:category and e.status=:status";
		query = session.createQuery(hql);
		query.setEntity("category", category);
		query.setInteger("status", status);
		Long count = (Long) query.uniqueResult();
		return count != null ? count.intValue() : 0;
	}

	public Integer getPageTotal(User user, Integer status) {
		init();
		hql = "select count(*) from Software e where e.user=:user and e.status=:status";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setInteger("status", status);
		Long count = (Long) query.uniqueResult();
		return count != null ? count.intValue() : 0;
	}

	@SuppressWarnings("unchecked")
	public List<Software> listPaging(User user, Page page, Integer status) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Software as e where e.user=:user and e.status=:status order by uploadTime desc";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setInteger("status", status);
		query.setFirstResult(index);
		query.setMaxResults(page.getEach());
		List<Software> objectList = query.list();
		return objectList;
	}

	@SuppressWarnings("unchecked")
	public List<Software> listPaging(Category category, Page page) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Software as e where e.category=:category and e.status!=:status order by uploadTime desc";
		query = session.createQuery(hql);
		query.setEntity("category", category);
		query.setInteger("status", FinalUtil.SOFTWARE_DELETE);
		query.setFirstResult(index);
		query.setMaxResults(page.getEach());
		List<Software> objectList = query.list();
		return objectList;
	}

	@SuppressWarnings("unchecked")
	public List<Software> listPagingByFile(Category category, Page page) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Software as e where e.category=:category and e.status=:status order by uploadTime desc";
		query = session.createQuery(hql);
		query.setEntity("category", category);
		query.setInteger("status", FinalUtil.SOFTWARE_FILE);
		query.setFirstResult(index);
		query.setMaxResults(page.getEach());
		List<Software> objectList = query.list();
		return objectList;
	}

	@SuppressWarnings("unchecked")
	public List<SoftwareLog> getLogByAction(Software software, Integer action) {
		init();
		hql = "from SoftwareLog e where e.software=:software and e.action=:action";
		query = session.createQuery(hql);
		query.setEntity("software", software);
		query.setInteger("action", action);
		List<SoftwareLog> objectList = query.list();
		return objectList;
	}

	public Integer getGradeByUser(Software software) {
		init();
		hql = "select e.content from SoftwareLog e where e.user=:user and e.software=:software and e.action=:action";
		query = session.createQuery(hql);
		query.setEntity("user", software.getUser());
		query.setEntity("software", software);
		query.setInteger("action", FinalUtil.SOFTWARE_GRADE);
		Object obj = query.uniqueResult();
		Double grade = Double.parseDouble((String) (obj == null ? "0" : obj));
		return grade.intValue();
	}
	public void addLog(SoftwareLog softwareLog) {
		init();
		hibernate.save(softwareLog);
	}

	public List<SoftwareLog> getLogBySoftware(Software software) {
		init();
		hql = "from SoftwareLog e where e.software=:software";
		query = session.createQuery(hql);
		query.setEntity("software", software);
		List<SoftwareLog> objectList = query.list();
		return objectList;
	}

	public String getUrlById(Integer id) {
		init();
		hql = "select e.url from Software e where e.id=:id";
		query = session.createQuery(hql);
		query.setInteger("id", id);
		String url = (String) query.uniqueResult();
		return url;
	}
}
