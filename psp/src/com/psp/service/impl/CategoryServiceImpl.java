/**   
* @Title: CategoryServiceImpl.java
* @Package com.psp.service.impl
* @Description: TODO
* @author wangyachao 
* @date 2014-4-19 下午11:56:52
* @version V1.0   
*/


package com.psp.service.impl;

import java.util.List;

import com.psp.dao.CategoryDao;
import com.psp.service.CategoryService;
import com.psp.util.Page;
import com.psp.web.domain.Category;

/**
 * 
 * @author wangyachao
 * @date 2014-4-19 下午11:56:52
 * @version V1.0
 */
public class CategoryServiceImpl implements CategoryService{
	private CategoryDao categoryDao;
	public void setCategoryDao(CategoryDao categoryDao) {
		this.categoryDao = categoryDao;
	}
	public List<Category> loadAllCategory() {
		List<Category> allCategory = categoryDao.loadAllCategory();
		return allCategory;
	}
	public List<Category> listPaging(Page page) {
		// TODO Auto-generated method stub
		return null;
	}
	public Category findCategoryByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}
	public Category findCategoryById(Integer id) {
		Category findCategoryById = categoryDao.findCategoryById(id);
		return findCategoryById;
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
	public List<Category> loadCategoryByType(int type) {
		List<Category> list = categoryDao.loadCategoryByType(type);
		return list;
	}
}
