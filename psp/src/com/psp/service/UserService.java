package com.psp.service;

import com.psp.web.domain.User;

/**
 * 类名称：UserService 类描述：UserService 创建人：王亚超 创建时间：2014-3-16 下午7:35:23
 * 
 * @version 1.0
 */
public interface UserService {
	/**
	 * 
	 * 根据名字查找用户
	 * 
	 * @param name
	 */
	User findUserByName(String name);

	/**
	 * 
	 * 注册用户
	 * 
	 * @param user
	 */
	int register(User user);

	/**
	 * 
	 * 注册检查
	 * 
	 * @param user
	 * @return String 用户信息的正确性
	 */
	String rigisterCheck(User user);

	/**
	 * 用户登录
	 * 
	 * @param user
	 * @return String 是否登陆成功
	 */
	User login(User user);

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

	void addScore(User user, int score);

	User editBase(User user);

	String editPassword(User user, String newPassword, String surePassword);

	void editEmailLogin(User user);

	void addScore(User user, Integer score);

	void exit(User user);

	Integer countOnline();

}
