package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：Solve 类描述：需求解决方案 创建人：王亚超 创建时间：2014-3-7 下午11:27:34
 * 
 * @version 1.0
 */
public class Solve extends BaseDomain {
	private static final long serialVersionUID = -8117393807951209936L;
	private User user;//n-1
	private Need need;//n-1
	private String scheme;
	private Integer solveOrder;// 方案次序
	private Timestamp solveTime;// 发布方案时间
	private Integer status;// 方案状态（是否为最好方案

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Need getNeed() {
		return need;
	}

	public void setNeed(Need need) {
		this.need = need;
	}

	public String getScheme() {
		return scheme;
	}

	public void setScheme(String scheme) {
		this.scheme = scheme;
	}

	public Integer getSolveOrder() {
		return solveOrder;
	}

	public void setSolveOrder(Integer solveOrder) {
		this.solveOrder = solveOrder;
	}

	public Timestamp getSolveTime() {
		return solveTime;
	}

	public void setSolveTime(Timestamp solveTime) {
		this.solveTime = solveTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

}
