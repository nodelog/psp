package com.psp.web.domain;

import java.sql.Timestamp;
import java.util.List;

/**
 * 类名称：Problem 类描述：问题，提问 创建人：王亚超 创建时间：2014-3-7 下午11:25:42
 * 
 * @version 1.0
 */
public class Problem extends BaseDomain {

	private static final long serialVersionUID = -5901222207646355176L;
	private User user;// 提问者 n-1
	private String title;// 标题
	private String content;// 内容
	private Timestamp createTime;// 提问时间
	private Timestamp confirmTime;// 确认最佳答案时间
	private Category category;// 分类n-1
	private Integer status;// 状态
	private Integer score;//悬赏公益币
	private List<Answer> answers;
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

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

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Timestamp getConfirmTime() {
		return confirmTime;
	}

	public void setConfirmTime(Timestamp confirmTime) {
		this.confirmTime = confirmTime;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}

	

}
