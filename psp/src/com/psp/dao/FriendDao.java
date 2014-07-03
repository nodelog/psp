package com.psp.dao;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Friend;

public interface FriendDao {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Friend findFriendByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Friend findFriendById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param friend
	* @return String   
	* @throws 
	*/
	String addFriend(Friend friend);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Friend>   
	* @throws 
	*/
	List<Friend> listPaging(Page page);
	/**
	* 删除实体
	* @author wangyachao
	* @param friend
	* @throws 
	*/
	void deleteFriend(Friend friend);
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
	* @param friend
	* @param id 
	* @throws 
	*/
	void updateFriend(Friend friend, int id);
}
