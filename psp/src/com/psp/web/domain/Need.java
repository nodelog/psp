package com.psp.web.domain;

import java.sql.Timestamp;
import java.util.List;

/**
 * 类名称：Need 类描述：需求 创建人：王亚超 创建时间：2014-3-7 下午11:20:50
 * 
 * @version 1.0
 */
public class Need extends BaseDomain {

	private static final long serialVersionUID = 2620290116011425708L;
	private User user;// 发布者 n-1
	private Category category;// 分类 n-1
	private String title;// 主题
	private String content;// 内容
	private Timestamp releaseTime;// 发布时间。
	private Integer score;// 设置最好的解决方案的用户可以获得的积分。
	private Integer status;// 状态，未解决，已解决

	//关联实体
	private List<Solve> solve;
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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

	public Timestamp getReleaseTime() {
		return releaseTime;
	}

	public void setReleaseTime(Timestamp releaseTime) {
		this.releaseTime = releaseTime;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public List<Solve> getSolve() {
		return solve;
	}

	public void setSolve(List<Solve> solve) {
		this.solve = solve;
	}

}
