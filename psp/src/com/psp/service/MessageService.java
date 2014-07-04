package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Message;
import com.psp.web.domain.User;

public interface MessageService {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Message findMessageByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Message findMessageById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param message
	* @return String   
	* @throws 
	*/
	void addMessage(Message message);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Message>   
	* @throws 
	*/
	List<Message> listPaging(Page page,User user);
	/**
	* 删除实体
	* @author wangyachao
	* @param message
	* @throws 
	*/
	void deleteMessage(Message message);
	/**
	 * 查询总页数
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page,User user);
	/**
	* 更新实体
	* @author wangyachao
	* @param message
	* @param id 
	* @throws 
	*/
	void updateMessage(Message message, int id);
	void readMessage(Message message);
	Integer getNewCount(User user);
}
