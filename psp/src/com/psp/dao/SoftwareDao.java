package com.psp.dao;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Software;
import com.psp.web.domain.SoftwareLog;
import com.psp.web.domain.User;

public interface SoftwareDao {
	/**
	 * 
	 * 根据名字字段查询对应实体的对象
	 * 
	 * @param name
	 *            实体名字字段
	 * @param entity
	 *            实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Software findSoftwareByName(String name);

	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * 
	 * @param name
	 *            实体名字字段
	 * @param entity
	 *            实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Software findSoftwareById(Integer id);

	Software findSoftwareFileById(Integer id);

	/**
	 * 添加实体
	 * 
	 * @author wangyachao
	 * @param software
	 * @return String   
	 * @throws 
	 */
	int addSoftware(Software software);

	/**
	 * 分页列表数据
	 * 
	 * @author wangyachao
	 * @param page
	 * @return List<Software>   
	 * @throws 
	 */
	List<Software> listPaging(Page page);

	List<Software> listPaging(User user, Page page, Integer status);

	List<Software> listPaging(Category category, Page page);

	List<Software> listPagingByFile(Category category, Page page);

	/**
	 * 删除实体
	 * 
	 * @author wangyachao
	 * @param software
	 * @throws 
	 */
	void deleteSoftware(Software software);

	/**
	 * 查询总页数
	 * 
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page);

	Integer getPageTotal(Category category);
	Integer getPageTotal(Category category,Integer status);

	Integer getPageTotal(User user, Integer status);

	/**
	 * 更新实体
	 * 
	 * @author wangyachao
	 * @param software
	 * @param id
	 * @throws 
	 */
	void updateSoftware(Software software, int id);

	List<SoftwareLog> getLogByAction(Software software, Integer action);

	Integer getGradeByUser(Software software);

	void addLog(SoftwareLog softwareLog);

	List<SoftwareLog> getLogBySoftware(Software software);
	String getUrlById(Integer id);
}
