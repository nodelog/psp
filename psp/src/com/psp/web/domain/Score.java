package com.psp.web.domain;

import java.util.List;

/**
 * 类名称：Score 类描述：积分规则 创建人：王亚超 创建时间：2014-3-7 下午11:26:01
 * 
 * @version 1.0
 */
public class Score extends BaseDomain {

	private static final long serialVersionUID = 6784073127514588296L;
	private Integer action;// 积分行为，注册，登录，评论，发表等
	private Integer number;// 积分额数

	//关联实体
	private List<ScoreLog> scoreLog;//用户积分日志
	public Integer getAction() {
		return action;
	}

	public void setAction(Integer action) {
		this.action = action;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public List<ScoreLog> getScoreLog() {
		return scoreLog;
	}

	public void setScoreLog(List<ScoreLog> scoreLog) {
		this.scoreLog = scoreLog;
	}

}
