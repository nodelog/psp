package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：PublicInterestLog 类描述：公益活动日志  创建人：王亚超 创建时间：2014-3-7 下午11:25:29
 * 
 * @version 1.0
 */
public class PublicInterestLog extends BaseDomain {

	private static final long serialVersionUID = -967165041135787915L;
	private User user;// 操作者 n-1
	private PublicInterest publicInterest;// 活动n-1
	private Integer action;// 操作，（报名，参加活动）
	private Timestamp actionTime;// 操作时间

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public PublicInterest getPublicInterest() {
		return publicInterest;
	}

	public void setPublicInterest(PublicInterest publicInterest) {
		this.publicInterest = publicInterest;
	}

	public Integer getAction() {
		return action;
	}

	public void setAction(Integer action) {
		this.action = action;
	}

	public Timestamp getActionTime() {
		return actionTime;
	}

	public void setActionTime(Timestamp actionTime) {
		this.actionTime = actionTime;
	}

}
