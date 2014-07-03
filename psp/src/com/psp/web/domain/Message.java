package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：Message 类描述：Message 创建人：王亚超 创建时间：2014-3-7 下午11:20:44
 * 
 * @version 1.0
 */
public class Message extends BaseDomain {

	private static final long serialVersionUID = -8090947005164175931L;
	private String title;// 发送者 n-1
	private User receiver;// 接受者n-1
	private String content;// 消息内容
	private Timestamp sendTime;// 发送时间
	private Integer status;// 消息状态，是否发送成功
	
	

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getSendTime() {
		return sendTime;
	}

	public void setSendTime(Timestamp sendTime) {
		this.sendTime = sendTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

}
