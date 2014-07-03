package com.psp.dao;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

/**
 * 问题数据库接口
 * 
 * @author wangyachao
 * @date 2014-4-19 下午5:38:18
 * @version V1.0
 */
public interface ProblemDao {

	/**
	 * 获得count数量个最热的问题
	 * 
	 * @author wangyachao
	 * @param count
	 * @return List<Problem>   
	 * @throws 
	 */
	List<Problem> getHotProblem(int count);

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
	 * 分页列表数据
	 * 
	 * @author wangyachao
	 * @param page
	 * @return List<Problem>   
	 * @throws 
	 */

	/**
	 * 删除实体
	 * 
	 * @author wangyachao
	 * @param problem
	 * @throws 
	 */

	/**
	 * 查询总页数
	 * 
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page, Category category);

	Integer getPageTotal(Page page, User user);

	/**
	 * 获得指定类型问题数量
	 * 
	 * @author wangyachao
	 * @return Integer   
	 * @throws 
	 */
	Integer getCountByType(int status);

	Integer getCountByUser(User user);

	/**
	 * 获得前count个最新问题
	 * 
	 * @author wangyachao
	 * @return List<Problem>   
	 * @throws 
	 */
	List<Problem> getNewProblem(int count);

	List<Problem> findProblemByCategory(Category category, Page page);

	List<Problem> findProblemByUser(User user, Page page);

}
