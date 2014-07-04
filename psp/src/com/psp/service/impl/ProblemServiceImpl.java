/**   
 * @Title: ProblemServiceImpl.java
 * @Package com.psp.service.impl
 * @Description: TODO
 * @author wangyachao 
 * @date 2014-4-19 下午5:55:28
 * @version V1.0   
 */

package com.psp.service.impl;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.psp.dao.AnswerDao;
import com.psp.dao.CategoryDao;
import com.psp.dao.MessageDao;
import com.psp.dao.ProblemDao;
import com.psp.dao.UserDao;
import com.psp.service.ProblemService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Answer;
import com.psp.web.domain.Category;
import com.psp.web.domain.Message;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

/**
 * 问题业务逻辑接口的实现
 * 
 * @author wangyachao
 * @date 2014-4-19 下午5:55:28
 * @version V1.0
 */
public class ProblemServiceImpl implements ProblemService {
	private ProblemDao problemDao;
	private AnswerDao answerDao;
	private CategoryDao categoryDao;
	private UserDao userDao;
	private MessageDao messageDao;

	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public void setCategoryDao(CategoryDao categoryDao) {
		this.categoryDao = categoryDao;
	}

	public void setProblemDao(ProblemDao problemDao) {
		this.problemDao = problemDao;
	}

	public void setAnswerDao(AnswerDao answerDao) {
		this.answerDao = answerDao;
	}

	public List<Problem> getHotProblem() {
		List<Problem> hotProblem = problemDao
				.getHotProblem(FinalUtil.PROBLEM_HOT_COUNT);
		return hotProblem;
	}

	public Problem findProblemById(Integer id) {
		Problem problemById = problemDao.findProblemById(id);
		return problemById;
	}

	public int addProblem(Problem problem) {
		int id = problemDao.addProblem(problem);
		userDao.addScore(problem.getUser(), FinalUtil.ADD_PROBLEM);
		String title = "提问成功@" + problem.getTitle();
		String content = FinalUtil.MESSAGE_ADD_PROBLEM + problem.getTitle();
		addMessage(problem.getUser(), title, content);
		return id;
	}

	private void addMessage(User user, String title, String content) {
		Message message = new Message();
		message.setReceiver(user);
		message.setTitle(title);
		message.setContent(content);
		message.setSendTime(new Timestamp(System.currentTimeMillis()));
		message.setStatus(FinalUtil.MESSAGE_NEW);
		messageDao.addMessage(message);
	}

	public Map<String, Integer> countProblem() {
		Integer unResolvedCount = problemDao
				.getCountByType(FinalUtil.PROBLEM_UNRESOLVED);
		Integer resolvedCount = problemDao
				.getCountByType(FinalUtil.PROBLEM_RESOLVED);
		Map<String, Integer> countMap = new HashMap<String, Integer>();
		countMap.put("unResolved", unResolvedCount);
		countMap.put("resolved", resolvedCount);
		return countMap;
	}

	public List<Problem> getNewProblem() {
		List<Problem> newProblem = problemDao
				.getNewProblem(FinalUtil.PROBLEM_NEW_COUNT);
		return newProblem;
	}

	public List<Problem> findProblemByCategory(Category category, Page page) {
		List<Problem> problems = problemDao.findProblemByCategory(category,
				page);
		return problems;
	}

	public Integer getPageTotal(Page page, Integer categoryId) {
		Category category = categoryDao.findCategoryById(categoryId);
		Integer pageTotal = problemDao.getPageTotal(page, category);
		return pageTotal;
	}

	public Integer getPageTotal(Page page, User user) {
		Integer pageTotal = problemDao.getPageTotal(page, user);
		return pageTotal;
	}

	public List<Answer> findAnswerList(Problem problem) {
		List<Answer> findAnswerList = answerDao.findAnswerList(problem);
		return findAnswerList;
	}

	public void addAnswer(Answer answer) {
		Integer maxOrder = answerDao.findOrder(answer.getProblem());
		answer.setOrder(maxOrder != null ? maxOrder + 1 : 1);
		answerDao.addAnswer(answer);
		Problem problem = problemDao.findProblemById(answer.getProblem()
				.getId());
		String title = answer.getUser().getName() + "回答了我的问题@"
				+ problem.getTitle();
		addMessage(problem.getUser(), title, title);
	}

	// 设置最佳答案
	public void updateAnswer(Answer answer) {
		answer = answerDao.findAnswerById(answer.getId());
		answer.setStatus(FinalUtil.ANSWER_BEST);
		Integer problemId = answer.getProblem().getId();
		Problem problem = problemDao.findProblemById(problemId);
		problem.setStatus(FinalUtil.PROBLEM_RESOLVED);
		problem.setConfirmTime(new Timestamp(System.currentTimeMillis()));
		userDao.addScore(answer.getUser(), problem.getScore());
		String title = "我的问题解决@" + problem.getTitle();
		String content = FinalUtil.MESSAGE_ADD_ANSWER + problem.getTitle();
		addMessage(problem.getUser(), title, content);
		title = "帮助" + problem.getUser().getName() + "解决了一个问题@"
				+ problem.getTitle();
		content = "恭喜您！你对问题 " + problem.getTitle() + " 的回答获得了最佳答案，并获得了"
				+ problem.getScore() + "个公益币";
		addMessage(answer.getUser(), title, content);

	}

	public Map<String, Integer> countUserQA(User user) {
		Integer problemCount = problemDao.getCountByUser(user);
		Integer answerCount = answerDao.countByUser(user);
		Map<String, Integer> myCountMap = new HashMap<String, Integer>();
		myCountMap.put("myProblem", problemCount);
		myCountMap.put("myAnswer", answerCount);
		return myCountMap;
	}

	public List<Problem> findProblemByUser(User user, Page page) {
		List<Problem> problems = problemDao.findProblemByUser(user, page);
		return problems;
	}

	public List<Problem> findProblemByAnser(User user, Page page) {
		List<Problem> list = answerDao.findProblemByUser(user, page);
		return list;
	}

	public Integer getPageTotalByUser(Page page, User user) {
		Integer pageTotalByUser = answerDao.getPageTotalByUser(page, user);
		return pageTotalByUser;
	}

}
