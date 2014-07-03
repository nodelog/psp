package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.AnswerDao;
import com.psp.util.Page;
import com.psp.web.domain.Answer;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

public class AnswerDaoImpl extends BaseDao<Answer> implements AnswerDao {

	public Answer findAnswerByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Answer findAnswerById(Integer id) {
		init();
		Answer answer = hibernate.load(Answer.class, id);
		return answer;
	}

	public void addAnswer(Answer answer) {
		super.addEntity(answer);
	}

	public List<Answer> listPaging(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteAnswer(Answer answer) {
		// TODO Auto-generated method stub

	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateAnswer(Answer answer, int id) {
		// TODO Auto-generated method stub

	}

	@SuppressWarnings("unchecked")
	public void loadAnswer(List<Problem> problemList) {
		super.init();
		for (Problem problem : problemList) {
			hql = "from Answer as e where e.problem=:problem order by e.createTime desc";
			query = session.createQuery(hql);
			query.setEntity("problem", problem);
			List<Answer> objectList = query.list();
			problem.setAnswers(objectList);
		}
	}

	@SuppressWarnings("unchecked")
	public List<Answer> findAnswerList(Problem problem) {
		init();
		hql = "from Answer e where e.problem=:problem order by e.order desc,e.createTime desc";
		query = session.createQuery(hql);
		query.setEntity("problem", problem);
		List<Answer> objectList = query.list();
		return objectList;
	}

	public Integer findOrder(Problem problem) {
		init();
		hql = "select max(e.order) from Answer e where e.problem=:problem";
		query = session.createQuery(hql);
		query.setEntity("problem", problem);
		Object uniqueResult = query.uniqueResult();
		Integer maxOrder = uniqueResult != null ? (Integer) uniqueResult : null;
		return maxOrder;
	}

	public Integer countByUser(User user) {
		init();
		hql="select count(distinct problem) from Answer where user=:user";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		Long countLong = (Long)query.uniqueResult();
		Integer count = countLong!=null?countLong.intValue():0;
		return count;
	}

	@SuppressWarnings("unchecked")
	public List<Problem> findProblemByUser(User user,Page page) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql="select distinct e.problem from Answer e where e.user=:user";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setFirstResult(index);
		query.setMaxResults(page.getEach());
		List<Problem> list = query.list();
		return list;
	}
	public Integer getPageTotalByUser(Page page, User user) {
		init();
		hql = "select count(distinct e.problem) from Answer e where e.user=:user";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		Long total = (Long) query.uniqueResult();
		int each = page.getEach();
		int totalPage = total != null ? total.intValue() : 0;
		Integer count = totalPage / each + (totalPage % each == 0 ? 0 : 1);
		return count;
	}

}
