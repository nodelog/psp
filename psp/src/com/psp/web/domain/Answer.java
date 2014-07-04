package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：Answer 类描述：问题解答实体 创建人：王亚超 创建时间：2014-3-7 下午11:18:44
 * 
 * @version 1.0
 */
public class Answer extends BaseDomain {

	private static final long serialVersionUID = 631189422863795996L;
	private User user;// 解答者， anser-user:n-1
	private Problem problem;// 答案对应的问题，answer-problem:n-1
	private String content;// 答案内容
	private Integer order;// 答案的顺序
	private Timestamp createTime;// 答案创建时间
	private Integer status;// 答案状态，（最好答案，非最好答案）

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Problem getProblem() {
		return problem;
	}

	public void setProblem(Problem problem) {
		this.problem = problem;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Answer [user=" + user + ", problem=" + problem + ", content="
				+ content + ", order=" + order + ", createTime=" + createTime
				+ ", status=" + status + "]";
	}

}
