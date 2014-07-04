package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.MediaDao;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Media;
import com.psp.web.domain.User;

public class MediaDaoImpl extends BaseDao<Media> implements MediaDao{

	public Media findMediaByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Media findMediaById(Integer id) {
		Media entityById = super.getEntityById(new Media(), id);
		return entityById;
	}

	public Integer addMedia(Media media) {
		return super.addEntity(media);
	}

	@SuppressWarnings("unchecked")
	public List<Media> listPaging(Page page,Category category) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Media as e where e.category=:category order by e.uploadTime desc,e.id desc";
		query = session.createQuery(hql);
		query.setFirstResult(index);
		query.setEntity("category", category);
		query.setMaxResults(page.getEach());
		List<Media> objectList = query.list();
		return objectList;
	}
	@SuppressWarnings("unchecked")
	public List<Media> listPaging(Page page,Category category,User user) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Media as e where e.category=:category and e.user=:user order by e.uploadTime desc,e.id desc";
		query = session.createQuery(hql);
		query.setFirstResult(index);
		query.setEntity("category", category);
		query.setEntity("user", user);
		query.setMaxResults(page.getEach());
		List<Media> objectList = query.list();
		return objectList;
	}

	public void deleteMedia(Media media) {
		// TODO Auto-generated method stub
		
	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateMedia(Media media, int id) {
		// TODO Auto-generated method stub
		
	}

	public Integer getTotatlByType(Category category) {
		init();
		hql = "select count(*) from Media e where e.category=:category";
		query = session.createQuery(hql);
		query.setEntity("category", category);
		Long count = (Long) query.uniqueResult();
		return count != null ? count.intValue() : 0;
	}

	public Integer getTotatlByUser(Category category, User user) {
		init();
		hql = "select count(*) from Media e where e.category=:category and e.user=:user";
		query = session.createQuery(hql);
		query.setEntity("category", category);
		query.setEntity("user", user);
		Long count = (Long) query.uniqueResult();
		return count != null ? count.intValue() : 0;
	}

	public String getUrlById(Integer id) {
		init();
		hql = "select e.url from Media e where e.id=:id";
		query = session.createQuery(hql);
		query.setInteger("id", id);
		String url = (String) query.uniqueResult();
		return url;
	}

}
