package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.ProblemDao;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

/**
 * 问题数据库接口实现
 * 
 * @author wangyachao
 * @date 2014-4-19 下午5:39:00
 * @version V1.0
 */
public class ProblemDaoImpl extends BaseDao<Problem> implements ProblemDao {

	@SuppressWarnings("unchecked")
	public List<Problem> getHotProblem(int count) {
		super.init();
		hql = "from Problem as e where e.status=:status order by e.confirmTime desc";
		query = session.createQuery(hql);
		query.setInteger("status", FinalUtil.PROBLEM_RESOLVED);
		query.setMaxResults(count);
		List<Problem> list = query.list();
		return list;
	}

	public Problem findProblemById(Integer id) {
		Problem problem = super.getEntityById(new Problem(), id);
		return problem;
	}

	public int addProblem(Problem problem) {
		int id = super.addEntity(problem);
		return id;
	}

	public Integer getCountByType(int status) {
		init();
		hql = "select count(*) from Problem as e where e.status=:status";
		query = session.createQuery(hql);
		query.setInteger("status", status);
		long count = (Long) query.uniqueResult();
		return (int) count;
	}

	public Integer getCountByUser(User user) {
		init();
		hql = "select count(*) from Problem as e where e.user=:user";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		Long count = (Long) query.uniqueResult();
		return count != null ? count.intValue() : 0;
	}

	public List<Problem> getNewProblem(int count) {
		List<Problem> newEntity = getNewEntity(count, FinalUtil.PROBLEM,
				FinalUtil.PROBLEM_DELETE);
		return newEntity;
	}

	@SuppressWarnings("unchecked")
	public List<Problem> findProblemByCategory(Category category, Page page) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Problem as e where e.category=:category and e.status!=:status order by e.createTime desc";
		query = session.createQuery(hql);
		query.setInteger("status", FinalUtil.PROBLEM_DELETE);
		query.setFirstResult(index);
		query.setEntity("category", category);
		query.setMaxResults(page.getEach());
		List<Problem> objectList = query.list();
		return objectList;
	}

	public Integer getPageTotal(Page page, Category category) {
		init();
		hql = "select count(*) from Problem as e where e.category=:category and e.status!=:status order by createTime desc";
		query = session.createQuery(hql);
		query.setEntity("category", category);
		query.setInteger("status", FinalUtil.PROBLEM_DELETE);
		Long total = (Long) query.uniqueResult();
		int each = page.getEach();
		int totalPage = total != null ? total.intValue() : 0;
		Integer count = totalPage / each + (totalPage % each == 0 ? 0 : 1);
		return count;
	}

	public Integer getPageTotal(Page page, User user) {
		init();
		hql = "select count(*) from Problem as e where e.user=:user and e.status!=:status";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setInteger("status", FinalUtil.PROBLEM_DELETE);
		Long total = (Long) query.uniqueResult();
		int each = page.getEach();
		int totalPage = total != null ? total.intValue() : 0;
		Integer count = totalPage / each + (totalPage % each == 0 ? 0 : 1);
		return count;
	}

	@SuppressWarnings("unchecked")
	public List<Problem> findProblemByUser(User user, Page page) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Problem as e where e.user=:user and e.status!=:status order by createTime desc";
		query = session.createQuery(hql);
		query.setInteger("status", FinalUtil.PROBLEM_DELETE);
		query.setFirstResult(index);
		query.setEntity("user", user);
		query.setMaxResults(page.getEach());
		List<Problem> objectList = query.list();
		return objectList;
	}

}
