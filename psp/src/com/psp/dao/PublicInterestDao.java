package com.psp.dao;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.PublicInterest;

/**
 * 公益活动数据库接口
 * 
 * @author wangyachao
 * @date 2014-3-30 下午8:13:43
 * @version V1.0
 */
public interface PublicInterestDao {

	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<PublicInterest>   
	* @throws 
	*/
	List<PublicInterest> listPaging(Page page);

	/**
	 * 查询总页数
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page);
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	PublicInterest findPublicInterestByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	PublicInterest findPublicInterestById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param publicInterest
	* @return String   
	* @throws 
	*/
	String addPublicInterest(PublicInterest publicInterest);
	/**
	* 删除实体
	* @author wangyachao
	* @param publicInterest
	* @throws 
	*/
	void deletePublicInterest(PublicInterest publicInterest);
}
