package com.psp.service.impl;

import java.sql.Timestamp;

import org.apache.commons.lang3.StringUtils;

import com.psp.dao.LevelDao;
import com.psp.dao.UserDao;
import com.psp.service.UserService;
import com.psp.util.FinalUtil;
import com.psp.util.MD5;
import com.psp.web.domain.Level;
import com.psp.web.domain.LevelRule;
import com.psp.web.domain.User;

/**
 * 类名称：UserServiceImpl 类描述：UserServiceImpl 创建人：王亚超 创建时间：2014-3-16 下午7:35:51
 * 
 * @version 1.0
 */
public class UserServiceImpl implements UserService {
	private UserDao userDao;
	private LevelDao levelDao;
	public void setLevelDao(LevelDao levelDao) {
		this.levelDao = levelDao;
	}
	// 注入dao成对象
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public User findUserByName(String name) {
		User user = userDao.findUserByName(name);
		return user;
	}

	// 用户注册
	public int register(User user) {
		user.setEmailLogin(true);
		user.setStatus(FinalUtil.OFF_LIINE);
		user.setValidationProblem(FinalUtil.NULL);
		user.setValidationAnswer(FinalUtil.NULL);
		user.setPassword(MD5.getMD5Str(user.getPassword()));
		user.setSex(FinalUtil.MALE);//默认性别
		user.setRegisterTime(new Timestamp(System.currentTimeMillis()));
		//设置等级和积分
		Level level = new Level();
		level.setScoreNumber(FinalUtil.ADD_REGISTER);
		LevelRule levelRule = levelDao.getLevelRuleByScore(FinalUtil.ADD_REGISTER);
		level.setLevelRule(levelRule);
		Integer levelId = levelDao.addLevel(level);
		level.setId(levelId);
		user.setLevel(level);
		int result = userDao.addUser(user);

		return result;
	}

	// 验证注册用户信息
	public String rigisterCheck(User user) {
		String result = checkUser(user);
		return result;
	}

	public String checkUser(User user) {
		if (user == null) {
			return FinalUtil.USER_NULL;
		}
		if (StringUtils.isEmpty(user.getName())) {
			return FinalUtil.USER_NAME_NULL;
		}
		if (StringUtils.isEmpty(user.getPassword())) {
			return FinalUtil.USER_PASSWORD_NULL;
		}
		if (StringUtils.isEmpty(user.getEmail())) {
			return FinalUtil.USER_EMAIL_NULL;
		}
		User userFromDb = findUserByName(user.getName());
		if (userFromDb != null) {
			return FinalUtil.USER_NAME_EXISTS;
		}
		return FinalUtil.SUCCESS;
	}

	public User login(User user) {
		User userFromDb = userDao.findUserByNameOrEmail(user.getName());
		String passwordMd5Str = MD5.getMD5Str(user.getPassword());
		if (userFromDb != null
				&& StringUtils.equals(userFromDb.getPassword(), passwordMd5Str)) {
			userDao.addScore(userFromDb, FinalUtil.ADD_LOGIN);
			userFromDb.setStatus(FinalUtil.ON_LIINE);
		} else {
			userFromDb = null;
		}
		return userFromDb;
	}

	public User findUserById(Integer id) {
		User user = userDao.findUserById(id);
		return user;
	}

	

	public void addScore(User user, int score) {
		user = userDao.findUserById(user.getId());
		Level level = user.getLevel();
		score = score + level.getScoreNumber();
		level.setScoreNumber(score);
	}

	public User editBase(User user) {
		User userById = userDao.findUserById(user.getId());
		userById.setName(user.getName());
		userById.setEmail(user.getEmail());
		userById.setSex(user.getSex());
		return userById;
	}

	public String editPassword(User user, String newPassword,
			String surePassword) {
		User userById = userDao.findUserById(user.getId());
		if(!userById.getPassword().equals(MD5.getMD5Str(user.getPassword()))){
			return "旧密码错误";
		}
		if(!newPassword.equals(surePassword)){
			return "两次密码不一致";
		}
		userById.setPassword(MD5.getMD5Str(newPassword));
		return FinalUtil.SUCCESS;
	}

	public void editEmailLogin(User user) {
		User userById = userDao.findUserById(user.getId());
		userById.setEmailLogin(user.getEmailLogin());
		
	}
	public void addScore(User user, Integer score) {
		userDao.addScore(user, score);
	}
	public void exit(User user) {
		User userById  = userDao.findUserById(user.getId());
		userById.setStatus(FinalUtil.OFF_LIINE);
	}
	public Integer countOnline() {
		Integer online = userDao.countOnline();
		return online;
	}

}
