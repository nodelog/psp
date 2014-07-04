package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Answer;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

public interface AnswerService {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Answer findAnswerByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Answer findAnswerById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param answer
	* @return String   
	* @throws 
	*/
	String addAnswer(Answer answer);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Answer>   
	* @throws 
	*/
	List<Answer> listPaging(Page page);
	/**
	* 删除实体
	* @author wangyachao
	* @param answer
	* @throws 
	*/
	void deleteAnswer(Answer answer);
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
	* @param answer
	* @param id 
	* @throws 
	*/
	void updateAnswer(Answer answer, int id);
}
