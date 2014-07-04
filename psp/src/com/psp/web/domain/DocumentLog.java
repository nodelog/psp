package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：DocumentLog 类描述：文档操作日志 创建人：王亚超 创建时间：2014-3-7 下午11:19:34
 * 
 * @version 1.0
 */
public class DocumentLog extends BaseDomain {

	private static final long serialVersionUID = -8440582244626127302L;
	private User user;// 操作人，日志-用户：多对一
	private Document document;// 操作的文档，日志-文档：多对一
	private Integer action;// 操作（浏览，下载，评论，评分，回复）
	private Timestamp actionTime;// 操作时间
	private String content;// 操作内容，评论，评分，回复的内容。
	private Integer commentOrder;// 评论顺序，不是评论操作为空。
	private Integer replayOrder;// 回复次序
	private User replayUser;// 被回复的人，此条回复给谁回复的。n-1

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Document getDocument() {
		return document;
	}

	public void setDocument(Document document) {
		this.document = document;
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

	public Integer getCommentOrder() {
		return commentOrder;
	}

	public void setCommentOrder(Integer commentOrder) {
		this.commentOrder = commentOrder;
	}

	public Integer getReplayOrder() {
		return replayOrder;
	}

	public void setReplayOrder(Integer replayOrder) {
		this.replayOrder = replayOrder;
	}

	public User getReplayUser() {
		return replayUser;
	}

	public void setReplayUser(User replayUser) {
		this.replayUser = replayUser;
	}

}
