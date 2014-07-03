package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.PublicInterest;


/**
 * 类名称：PublicInterestService
 * 类描述：公益活动服务接口
 * 创建人：王亚超
 * 创建时间：2014-3-16 下午7:35:23
 * @version 1.0
 */
public interface PublicInterestService {
	
	/**
	* 分页查询数据
	* @param page
	* @return List PublicInterest
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
