package com.psp.service.impl;

import java.sql.Timestamp;
import java.util.List;

import com.psp.dao.CategoryDao;
import com.psp.dao.MessageDao;
import com.psp.dao.SkillDao;
import com.psp.dao.UserDao;
import com.psp.service.SkillService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Message;
import com.psp.web.domain.Skill;
import com.psp.web.domain.SkillTalk;
import com.psp.web.domain.User;

public class SkillServiceImpl implements SkillService {
	private SkillDao skillDao;
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

	public void setSkillDao(SkillDao skillDao) {
		this.skillDao = skillDao;
	}

	public Skill findSkillByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Skill findSkillById(Integer id) {
		Skill skill = skillDao.findSkillById(id);
		return skill;
	}

	public void addSkill(Skill skill) {
		skillDao.addSkill(skill);
		userDao.addScore(skill.getUser(), FinalUtil.ADD_SKILL);
		String title = "发布技术成功@"+skill.getTitle();
		String content =  FinalUtil.MESSAGE_ADD_SKILL+skill.getTitle();
		addMessage(skill.getUser(),title,content);
	}
	private void addMessage(User user, String title, String content){
		Message message = new Message();
		message.setReceiver(user);
		message.setTitle(title);
		message.setContent(content);
		message.setSendTime(new Timestamp(System.currentTimeMillis()));
		message.setStatus(FinalUtil.MESSAGE_NEW);
		messageDao.addMessage(message);
	}

	public List<Skill> listPaging(Page page) {
		List<Skill> list = skillDao.listPaging(page);
		return list;
	}

	public List<Skill> listPaging(Page page, User user) {
		List<Skill> list = skillDao.listPaging(page, user);
		return list;
	}

	public List<Skill> listPaging(Page page, Category category) {
		List<Skill> list = skillDao.listPaging(page, category);
		return list;
	}

	public void deleteSkill(Skill skill) {
		// TODO Auto-generated method stub

	}

	public Integer getPageTotal(Page page) {
		Integer pageTotal = skillDao.getPageTotal(page);
		return pageTotal;
	}

	public Integer getPageTotal(Page page, User user) {
		Integer pageTotal = skillDao.getPageTotal(page, user);
		return pageTotal;
	}

	public void updateSkill(Skill skill, int id) {
		// TODO Auto-generated method stub

	}

	public List<Category> loadCategory() {
		List<Category> list = categoryDao
				.loadCategoryByType(FinalUtil.TYPE_SKILL);
		Page page = new Page();
		for (Category category : list) {
			Integer pageTotal = skillDao.getPageTotal(page, category);
			category.setPageTotal(pageTotal);
		}
		return list;
	}

	public void addView(Skill skill) {
		skill = skillDao.findSkillById(skill.getId());
		skill.setViewCount(skill.getViewCount() + 1);
		SkillTalk skillTalk = new SkillTalk();
		skillTalk.setAction(FinalUtil.SKILL_VIEW);
		skillTalk.setTalkTime(new Timestamp(System.currentTimeMillis()));
		skillTalk.setSkill(skill);
		skillTalk.setUser(skill.getUser());
		skillDao.addSkillTalk(skillTalk);// 添加日志
	}

	public void addGrade(Skill skill) {
		Integer userGrade = skillDao.getGradeByUser(skill);
		if (userGrade == 0) {
			SkillTalk skillTalk = new SkillTalk();
			skillTalk.setAction(FinalUtil.SKILL_GRADE);
			skillTalk.setTalkTime(new Timestamp(System.currentTimeMillis()));
			skillTalk.setSkill(skill);
			skillTalk.setUser(skill.getUser());
			skillTalk.setContent(skill.getGrade().toString());
			skillDao.addSkillTalk(skillTalk);// 添加日志
			List<SkillTalk> list = skillDao.getSkillTalkBySkill(skill,
					FinalUtil.SKILL_GRADE);
			int count = 1;
			if (list != null) {
				count = list.size();
			}
			double grade = 0D;
			for (SkillTalk log : list) {
				grade += Double.parseDouble((log.getContent()));
			}
			grade = grade / count;
			Skill skillDb = skillDao.findSkillById(skill.getId());
			skillDb.setGrade(grade);
			String title = skill.getUser().getName()+"给我的技术@"+skillDb.getTitle()+"打了"+skill.getGrade().toString()+"分";
			addMessage(skillDb.getUser(),title,title);
		}
	}

	public Integer getGradeByUser(Skill skill) {
		Integer grade = skillDao.getGradeByUser(skill);
		return grade;
	}

	public void editSkill(Skill skill) {
		Skill skillTemp= skillDao.findSkillById(skill.getId());
		skillTemp.setCategory(skill.getCategory());
		skillTemp.setContent(skill.getContent());
		skillTemp.setTitle(skill.getTitle());
	}

}
