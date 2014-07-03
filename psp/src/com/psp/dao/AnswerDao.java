package com.psp.dao;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Answer;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

public interface AnswerDao {
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
	Answer findAnswerByName(String name);

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
	Answer findAnswerById(Integer id);

	/**
	 * 分页列表数据
	 * 
	 * @author wangyachao
	 * @param page
	 * @return List<Answer>   
	 * @throws 
	 */
	List<Answer> listPaging(Page page);

	/**
	 * 删除实体
	 * 
	 * @author wangyachao
	 * @param answer
	 * @throws 
	 */
	void deleteAnswer(Answer answer);

	/**
	 * 查询总页数
	 * 
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page);

	/**
	 * 更新实体
	 * 
	 * @author wangyachao
	 * @param answer
	 * @param id
	 * @throws 
	 */
	void updateAnswer(Answer answer, int id);

	/**
	 * 初始化问题的答案
	 * 
	 * @author wangyachao
	 * @param problemList
	 *            void   
	 * @throws 
	 */
	void loadAnswer(List<Problem> problemIdList);

	List<Answer> findAnswerList(Problem problem);

	void addAnswer(Answer answer);

	Integer findOrder(Problem problem);

	Integer countByUser(User user);

	List<Problem> findProblemByUser(User user, Page page);

	Integer getPageTotalByUser(Page page, User user);

}
