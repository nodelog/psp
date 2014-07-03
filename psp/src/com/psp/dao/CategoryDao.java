/**   
* @Title: CategoryDao.java
* @Package com.psp.dao
* @Description: TODO
* @author wangyachao 
* @date 2014-4-19 下午10:15:05
* @version V1.0   
*/


package com.psp.dao;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Category;

/**
 * 分类数据库接口
 * @author wangyachao
 * @date 2014-4-19 下午10:15:05
 * @version V1.0
 */
public interface CategoryDao {
	/**
	* 加载所有分类信息
	* @author wangyachao
	* @return List<Category>   
	* @throws 
	*/
	List<Category> loadAllCategory();
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Category>   
	* @throws 
	*/
	List<Category> listPaging(Page page);
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Category findCategoryByName(String name);
	Category findCategoryByName(String name,Integer type);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param id 实体主键
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Category findCategoryById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @return String   
	* @throws 
	*/
	String addCategory(Category category);
	/**
	* 删除实体
	* @author wangyachao
	* @param category
	* @throws 
	*/
	void deleteCategory(Category category);
	/**
	 * 查询总页数
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page);
	
	/**
	* 加载指定资源类型的分类
	* @author wangyachao
	* @param type
	* @return List<Category>   
	* @throws 
	*/
	List<Category> loadCategoryByType(int type);
}
