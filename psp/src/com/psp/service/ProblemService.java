/**   
 * @Title: ProblemService.java
 * @Package com.psp.service
 * @Description: 问题业务逻辑
 * @author wangyachao 
 * @date 2014-4-19 下午5:53:35
 * @version V1.0   
 */

package com.psp.service;

import java.util.List;
import java.util.Map;

import com.psp.util.Page;
import com.psp.web.domain.Answer;
import com.psp.web.domain.Category;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

/**
 * 问题业务逻辑接口
 * 
 * @author wangyachao
 * @date 2014-4-19 下午5:53:35
 * @version V1.0
 */
public interface ProblemService {

	/**
	 * 获得最热的话题
	 * 
	 * @author wangyachao
	 * @return List<Problem>   
	 * @throws 
	 */
	List<Problem> getHotProblem();

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
	Problem findProblemById(Integer id);

	/**
	 * 添加实体
	 * 
	 * @author wangyachao
	 * @param problem
	 * @return String   
	 * @throws 
	 */
	int addProblem(Problem problem);

	/**
	 * 查询总页数
	 * 
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */

	Integer getPageTotal(Page page, Integer categoryId);

	Integer getPageTotal(Page page, User user);

	/**
	 * 统计出解决和未解决的问题数量
	 * 
	 * @author wangyachao
	 * @return List<Integer>   
	 * @throws 
	 */
	Map<String, Integer> countProblem();

	Map<String, Integer> countUserQA(User user);

	List<Problem> getNewProblem();

	List<Problem> findProblemByCategory(Category category, Page page);

	List<Answer> findAnswerList(Problem problem);

	void addAnswer(Answer answer);

	void updateAnswer(Answer answer);

	List<Problem> findProblemByUser(User user, Page page);

	List<Problem> findProblemByAnser(User user, Page page);

	Integer getPageTotalByUser(Page page, User user);

}
