package com.psp.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.psp.util.Page;
import com.psp.web.domain.File;

/**
 * 类名称：BaseDao 类描述：数据基类 创建人：王亚超 创建时间：2014-3-16 下午7:07:37
 * 
 * @version 1.0
 */
public class BaseDao<T> extends HibernateDaoSupport {
	protected HibernateTemplate hibernate;
	protected Session session;
	protected String hql;
	protected Query query;
	protected StringBuffer stringBuffer;
	protected T object;

	/**
	* 初始化hibernate所需变量
	* @author wangyachao void   
	* @throws 
	*/
	public void init() {
		object = null;
		stringBuffer = new StringBuffer();
		hibernate = this.getHibernateTemplate();
		session = this.getSession();
	}

	/**
	* 根据实体名称查询实体
	* @author wangyachao
	* @param name
	* @param entity
	* @return T   
	* @throws 
	*/
	@SuppressWarnings("unchecked")
	public T findEntityByName(String name, String entity) {
		init();
		stringBuffer.append("from ");
		stringBuffer.append(entity);
		stringBuffer.append(" where");
		stringBuffer.append(" name=?");
		hql = stringBuffer.toString();
		List<T> objectList = hibernate.find(hql, name);
		if (objectList != null && objectList.size() > 0) {
			object = (T) objectList.get(0);
		}
		
		return object;
	}
	@SuppressWarnings("unchecked")
	public T findEntityById(Integer id, String entity) {
		init();
		stringBuffer.append("from ");
		stringBuffer.append(entity);
		stringBuffer.append(" where");
		stringBuffer.append(" id=?");
		hql = stringBuffer.toString();
		List<T> objectList = hibernate.find(hql, id);
		if (objectList != null && objectList.size() > 0) {
			object = (T) objectList.get(0);
		}
		
		return object;
	}
	@SuppressWarnings("unchecked")
	public T getEntityById(T entity, Integer id) {
		init();
		entity = (T) hibernate.load(entity.getClass(), id);
		return entity;
	}

	/**
	* 添加实体
	* @author wangyachao
	* @param entity
	* @return String   
	* @throws 
	*/
	public int addEntity(T entity) {
		init();
		int rows= (Integer) hibernate.save(entity);
		
		return rows;
	}
	/**
	 * 添加实体
	 * @author wangyachao
	 * @param entity
	 * @return String   
	 * @throws 
	 */
	
	/**
	* 分页查询实体
	* @author wangyachao
	* @param page
	* @param entity
	* @param status
	* @return List<T>   
	* @throws 
	*/
	@SuppressWarnings("unchecked")
	public List<T> listPaging(Page page, String entity, int status) {
		init();
		int index = (page.getCurrent()-1)*page.getEach();
		stringBuffer.append("from ");
		stringBuffer.append(entity);
		stringBuffer.append(" as e");
		stringBuffer.append(" where e.status!=:status");
		hql = stringBuffer.toString();
		query = session.createQuery(hql);
		query.setInteger("status", status);
		query.setFirstResult(index);
		query.setMaxResults(page.getEach());
		List<T> objectList = query.list();
		return objectList;
	}
	
	/**
	* 获得数据总页数
	* @author wangyachao
	* @param page
	* @param entity
	* @param status
	* @return Integer   
	* @throws 
	*/
	public Integer getPageTotal(Page page, String entity, int status) {
		init();
		stringBuffer.append(" select count(*) ");
		stringBuffer.append(" from ");
		stringBuffer.append(entity);
		stringBuffer.append(" as e ");
		stringBuffer.append(" where e.status!=:status ");
		hql = stringBuffer.toString();
		query = session.createQuery(hql);
		query.setInteger("status", status);
		Long total = (Long) query.uniqueResult();
		int each = page.getEach();
		int totalPage = total!=null?total.intValue():0;
		Integer count = totalPage/each+(totalPage%each==0?0:1);
		return count;
	}
	
	/**
	* 获得最新的实体列表
	* @author wangyachao
	* @param count
	* @return List<T>   
	* @throws 
	*/
	@SuppressWarnings("unchecked")
	public List<T> getNewEntity(int count, String entity, int status){
		init();
		stringBuffer.append("from ");
		stringBuffer.append(entity);
		stringBuffer.append(" as e ");
		stringBuffer.append(" where e.status!=:status ");
		stringBuffer.append(" order by e.createTime desc ");
		hql = stringBuffer.toString();
		query = session.createQuery(hql);
		query.setInteger("status", status);
		query.setMaxResults(count);
		List<T> objectList = query.list();
		return objectList;
		
	}
	
	/**
	* 加载实体所有记录
	* @author wangyachao
	* @param entity
	* @param status
	* @return List<T>   
	* @throws 
	*/
	@SuppressWarnings("unchecked")
	public List<T> loadAllEntity(String entity, int status){
		init();
		stringBuffer.append("from ");
		stringBuffer.append(entity);
		stringBuffer.append(" as e ");
		stringBuffer.append(" where e.status!=:status ");
		stringBuffer.append(" order by e.id desc ");
		hql = stringBuffer.toString();
		query = session.createQuery(hql);
		query.setInteger("status", status);
		List<T> objectList = query.list();
		return objectList;
	}
	
	/**
	* 初始化关联实体
	* @author wangyachao
	* @param entity
	* @param relation
	* @param idList
	* @return List<List<T>>   
	* @throws 
	*/
	@SuppressWarnings("unchecked")
	public List<List<T>> loadRelationEntity(String entity,String relation, List<Integer> idList){
		init();
		List<List<T>> list = new ArrayList<List<T>>();
		for (Integer id : idList) {
			stringBuffer.setLength(0);
			stringBuffer.append("from ");
			stringBuffer.append(entity);
			stringBuffer.append(" as e ");
			stringBuffer.append(" where e.");
			stringBuffer.append(relation);
			stringBuffer.append("=");
			stringBuffer.append(id);
			stringBuffer.append(" order by e.id desc ");
			hql = stringBuffer.toString();
			query = session.createQuery(hql);
			List<T> objectList = query.list();
			list.add(objectList);			
		}
		return list;
	}
	
	@SuppressWarnings({"unchecked" })
	public List<File> getFileByApp(int appCode) {
		init();
		hql = "from File as e where e.app=:appCode and e.appId is not null order by e.time desc";
		query = session.createQuery(hql);
		query.setInteger("appCode", appCode);
		query.setFirstResult(0);
		query.setMaxResults(5);
		List<File> list = query.list();
		return list;
	}

	
}
