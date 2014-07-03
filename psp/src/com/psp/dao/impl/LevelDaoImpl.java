package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.LevelDao;
import com.psp.util.Page;
import com.psp.web.domain.Level;
import com.psp.web.domain.LevelRule;

public class LevelDaoImpl extends BaseDao<Level> implements LevelDao {

	public Level findLevelByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Level findLevelById(Integer id) {
		Level level = super.getEntityById(new Level(), id);
		return level;
	}

	public Integer addLevel(Level level) {
		int id = super.addEntity(level);
		return id;
	}

	public List<Level> listPaging(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteLevel(Level level) {
		// TODO Auto-generated method stub
		
	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateLevel(Level level, int id) {
		// TODO Auto-generated method stub
		
	}

	public LevelRule getLevelRuleByScore(Integer score) {
		init();
		hql = "from LevelRule e where e.maxScore>=:maxScore and e.minScore<=:minScore";
		query = session.createQuery(hql);
		query.setInteger("maxScore", score);
		query.setInteger("minScore", score);
		LevelRule levelRule = (LevelRule) query.uniqueResult();
		return levelRule;
	}

}
