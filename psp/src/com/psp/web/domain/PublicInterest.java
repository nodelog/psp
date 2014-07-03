package com.psp.web.domain;

import java.sql.Timestamp;
import java.util.List;

/**
 * 类名称：PublicInterest 类描述：公益实体类 创建人：王亚超 创建时间：2014-3-7 下午11:21:07
 * 
 * @version 1.0
 */
public class PublicInterest extends BaseDomain {

	private static final long serialVersionUID = -2904076432703576323L;
	private String title;// 活动主题
	private String content;// 内容
	private Timestamp startTime;// 开始时间
	private Timestamp endTime;// 结束时间
	private Timestamp applyTime;// 报名时间
	private Integer score;// 活动积分
	private int status;// 状态(未开始，报名中，正在进行，已结束）

	//关联实体
	private List<PublicInterestLog> publicInterestLog;//公益活动日志
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}

	public Timestamp getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(Timestamp applyTime) {
		this.applyTime = applyTime;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public List<PublicInterestLog> getPublicInterestLog() {
		return publicInterestLog;
	}

	public void setPublicInterestLog(List<PublicInterestLog> publicInterestLog) {
		this.publicInterestLog = publicInterestLog;
	}

}
