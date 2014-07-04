package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：SoftwareLog 类描述：软件操作日志 创建人：王亚超 创建时间：2014-3-7 下午11:27:17
 * 
 * @version 1.0
 */
public class SoftwareLog extends BaseDomain {

	/**
	 * serialVersionUID:TODO（用一句话描述这个变量表示什么）
	 * 
	 * @since Ver 1.1
	 */

	private static final long serialVersionUID = -1831360964943655361L;
	private User user;//n-1
	private Software software;//n-1
	private Integer action;// 操作（浏览，下载，评论，评分，回复）
	private Timestamp actionTime;
	private String content;
	private String commentOrder;
	private Integer repalyOrder;
	private User replayUser;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Software getSoftware() {
		return software;
	}

	public void setSoftware(Software software) {
		this.software = software;
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCommentOrder() {
		return commentOrder;
	}

	public void setCommentOrder(String commentOrder) {
		this.commentOrder = commentOrder;
	}

	public Integer getRepalyOrder() {
		return repalyOrder;
	}

	public void setRepalyOrder(Integer repalyOrder) {
		this.repalyOrder = repalyOrder;
	}

	public User getReplayUser() {
		return replayUser;
	}

	public void setReplayUser(User replayUser) {
		this.replayUser = replayUser;
	}

}
