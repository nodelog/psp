package com.psp.web.domain;

/**
 * 类名称：Level 类描述：每个用户的等级 创建人：王亚超 创建时间：2014-3-7 下午11:20:14
 * 
 * @version 1.0
 */
public class Level extends BaseDomain {

	private static final long serialVersionUID = 1279561342337997083L;
	private User user;//1-1
	private LevelRule levelRule;//n-1
	private Integer scoreNumber;//积分数

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LevelRule getLevelRule() {
		return levelRule;
	}

	public void setLevelRule(LevelRule levelRule) {
		this.levelRule = levelRule;
	}

	public Integer getScoreNumber() {
		return scoreNumber;
	}

	public void setScoreNumber(Integer scoreNumber) {
		this.scoreNumber = scoreNumber;
	}

}
