package com.psp.dao;

import com.psp.web.domain.User;

/**
 * 类名称：UserDao 类描述：用户数据库操作接口 创建人：王亚超 创建时间：2014-3-16 下午7:01:13
 * 
 * @version 1.0
 */
public interface UserDao {
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
	User findUserByName(String name);

	User findUserByNameOrEmail(String name);

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
	User findUserById(Integer id);

	/**
	 * 添加实体
	 * 
	 * @author wangyachao
	 * @param user
	 * @return String   
	 * @throws 
	 */
	int addUser(User user);

	void addScore(User user, int score);

	Integer countOnline();
}
