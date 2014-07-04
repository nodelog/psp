package com.psp.web.domain;

/**
 * 类名称：Friend 类描述：朋友关系 建人：王亚超 创建时间：2014-3-7 下午11:19:56
 * 
 * @version 1.0
 */
public class Friend extends BaseDomain {

	private static final long serialVersionUID = -4013901642871164683L;
	private User firstUser;// 好友关系中第一个 n-1
	private User secondUser;// 好友关系中第二个n-1
	private Integer status;//状态（关联，解除）
	public User getFirstUser() {
		return firstUser;
	}

	public void setFirstUser(User firstUser) {
		this.firstUser = firstUser;
	}

	public User getSecondUser() {
		return secondUser;
	}

	public void setSecondUser(User secondUser) {
		this.secondUser = secondUser;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

}
