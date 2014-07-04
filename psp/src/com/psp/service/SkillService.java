package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Skill;
import com.psp.web.domain.Software;
import com.psp.web.domain.User;

public interface SkillService {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Skill findSkillByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Skill findSkillById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param skill
	* @return String   
	* @throws 
	*/
	void addSkill(Skill skill);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Skill>   
	* @throws 
	*/
	List<Skill> listPaging(Page page);
	List<Skill> listPaging(Page page,User user);
	List<Skill> listPaging(Page page,Category category);
	/**
	* 删除实体
	* @author wangyachao
	* @param skill
	* @throws 
	*/
	void deleteSkill(Skill skill);
	/**
	 * 查询总页数
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page);
	Integer getPageTotal(Page page,User user);
	/**
	* 更新实体
	* @author wangyachao
	* @param skill
	* @param id 
	* @throws 
	*/
	void updateSkill(Skill skill, int id);
	List<Category> loadCategory();
	void addView(Skill skill);
	void addGrade(Skill skill);
	Integer getGradeByUser(Skill skill);
	void editSkill(Skill skill);
}
