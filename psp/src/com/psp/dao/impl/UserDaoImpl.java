package com.psp.dao.impl;

import com.psp.dao.LevelDao;
import com.psp.dao.UserDao;
import com.psp.util.FinalUtil;
import com.psp.web.domain.Level;
import com.psp.web.domain.LevelRule;
import com.psp.web.domain.User;

/**
 * 用户数据库接口实现
 * 
 * @author wangyachao
 * @date 2014-4-21 下午1:48:18
 * @version V1.0
 */
public class UserDaoImpl extends BaseDao<User> implements UserDao {
	private LevelDao levelDao;

	public void setLevelDao(LevelDao levelDao) {
		this.levelDao = levelDao;
	}

	public int addUser(User user) {
		int result = super.addEntity(user);

		return result;
	}

	public User findUserByName(String name) {
		User user = super.findEntityByName(name, FinalUtil.USER);
		return user;
	}

	public User findUserById(Integer id) {
		User entityById = super.getEntityById(new User(), id);
		return entityById;
	}

	public void addScore(User user, int score) {
		user = findUserById(user.getId());
		Level level = user.getLevel();
		score = score + level.getScoreNumber();
		level.setScoreNumber(score);
		LevelRule levelRule = levelDao.getLevelRuleByScore(score);
		if (level.getLevelRule().getLevelNumber() != levelRule.getLevelNumber()) {
			level.setLevelRule(levelRule);
		}
	}

	public User findUserByNameOrEmail(String name) {
		init();
		hql = "from User e where e.name=:name or (e.email=:email and e.emailLogin=:emailLogin)";
		query = session.createQuery(hql);
		query.setString("name", name);
		query.setString("email", name);
		query.setBoolean("emailLogin", FinalUtil.EMALIL_LOGIN);
		User user = (User) query.uniqueResult();
		return user;
	}

	public Integer countOnline() {
		init();
		hql = "select count(*) from User e where e.status=:status";
		query = session.createQuery(hql);
		query.setInteger("status", FinalUtil.ON_LIINE);
		Object obj = query.uniqueResult();
		return obj != null ? ((Long) obj).intValue() : 0;
	}
}
