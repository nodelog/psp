package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Level;

public interface LevelService {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Level findLevelByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Level findLevelById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param level
	* @return String   
	* @throws 
	*/
	String addLevel(Level level);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Level>   
	* @throws 
	*/
	List<Level> listPaging(Page page);
	/**
	* 删除实体
	* @author wangyachao
	* @param level
	* @throws 
	*/
	void deleteLevel(Level level);
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
	* @param level
	* @param id 
	* @throws 
	*/
	void updateLevel(Level level, int id);
}
