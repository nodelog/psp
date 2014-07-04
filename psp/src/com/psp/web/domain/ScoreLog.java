package com.psp.web.domain;

/**
 * 类名称：ScoreLog 类描述：积分日志 创建人：王亚超 创建时间：2014-3-7 下午11:26:07
 * 
 * @version 1.0
 */
public class ScoreLog extends BaseDomain {

	private static final long serialVersionUID = 1933625220974645882L;
	private User user;// 获得积分用户 n -1
	private Score score;// 积分规则 n-1

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Score getScore() {
		return score;
	}

	public void setScore(Score score) {
		this.score = score;
	}
}
