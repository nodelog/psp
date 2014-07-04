package com.psp.dao;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Need;

public interface NeedDao {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Need findNeedByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Need findNeedById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param need
	* @return String   
	* @throws 
	*/
	String addNeed(Need need);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Need>   
	* @throws 
	*/
	List<Need> listPaging(Page page);
	/**
	* 删除实体
	* @author wangyachao
	* @param need
	* @throws 
	*/
	void deleteNeed(Need need);
	/**
	 * 查询总页数
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page);
	/**
	* 更新实体
	* @author wangyachao
	* @param need
	* @param id 
	* @throws 
	*/
	void updateNeed(Need need, int id);
}
