/**   
* @Title: CategoryDaoImpl.java
* @Package com.psp.dao.impl
* @Description: TODO
* @author wangyachao 
* @date 2014-4-19 下午10:18:11
* @version V1.0   
*/


package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.CategoryDao;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;

/**
 * 分类数据库接口的实现
 * @author wangyachao
 * @date 2014-4-19 下午10:18:11
 * @version V1.0
 */
public class CategoryDaoImpl extends BaseDao<Category> implements CategoryDao {

	public List<Category> loadAllCategory() {
		List<Category> allEntity = super.loadAllEntity(FinalUtil.CATEGORY, FinalUtil.CATEGORY_DELETE);
		return allEntity;
	}

	public List<Category> listPaging(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public Category findCategoryByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}
	public Category findCategoryByName(String name,Integer type) {
		init();
		hql = "from Category e where e.name=:name and e.type=:type";
		query = session.createQuery(hql);
		query.setString("name", name);
		query.setInteger("type", type);
		query.setFirstResult(0);
		query.setMaxResults(1);
		Category category = (Category) query.uniqueResult();
		return category;
	}

	public Category findCategoryById(Integer id) {
		init();
		Category category = hibernate.get(Category.class, id);
		return category;
	}

	public String addCategory(Category category) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteCategory(Category category) {
		// TODO Auto-generated method stub
		
	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<Category> loadCategoryByType(int type) {
		init();
		hql = "from Category as e where e.type=:type and e.status!=:status";
		query = session.createQuery(hql);
		query.setInteger("type", type);
		query.setInteger("status", FinalUtil.CATEGORY_DELETE);
		List<Category> list = query.list();
		return list;
	}

}
