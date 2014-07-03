package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：SkillTalk 类描述：技术讨论 创建人：王亚超 创建时间：2014-3-7 下午11:26:58
 * 
 * @version 1.0
 */
public class SkillTalk extends BaseDomain {

	private static final long serialVersionUID = 1036678511972702454L;
	private User user;// 当前讨论用户n-1
	private Skill skill;// 讨论的技术n-1
	private Integer action;// 行为，（评论，回复，评分）
	private String content;// 内容
	private Timestamp talkTime;// 讨论时间
	private Integer commentOrder;// 评论次序（不是评论，为自定义空值
	private Integer replayOrder;// 回复次序
	private User replayUser;// 被回复人(回复给谁) n-1

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

	public Integer getAction() {
		return action;
	}

	public void setAction(Integer action) {
		this.action = action;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getTalkTime() {
		return talkTime;
	}

	public void setTalkTime(Timestamp talkTime) {
		this.talkTime = talkTime;
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
