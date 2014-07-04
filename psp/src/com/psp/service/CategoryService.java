/**   
* @Title: CategoryService.java
* @Package com.psp.service
* @Description: TODO
* @author wangyachao 
* @date 2014-4-19 下午10:55:24
* @version V1.0   
*/


package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Category;

/**
 * 分类业务逻辑
 * @author wangyachao
 * @date 2014-4-19 下午10:55:24
 * @version V1.0
 */
public interface CategoryService {
	/**
	* 加载所有分类业务
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
