package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Score;

public interface ScoreService {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Score findScoreByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Score findScoreById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param score
	* @return String   
	* @throws 
	*/
	String addScore(Score score);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Score>   
	* @throws 
	*/
	List<Score> listPaging(Page page);
	/**
	* 删除实体
	* @author wangyachao
	* @param score
	* @throws 
	*/
	void deleteScore(Score score);
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
	* @param score
	* @param id 
	* @throws 
	*/
	void updateScore(Score score, int id);
}
