package com.psp.web.domain;

import java.sql.Timestamp;
import java.util.List;

/**
 * 类名称：Skill 类描述：技术指南 创建人：王亚超 创建时间：2014-3-7 下午11:26:20
 * 
 * @version 1.0
 */
public class Skill extends BaseDomain {
	
	private static final long serialVersionUID = -4947886755233506635L;
	private User user;// 发布技术者 n-1
	private Category category;// 分类 n-1
	private String title;// 主题
	private String content;// 内容
	private String file;// 附件
	private Timestamp createTime;// 发布时间
	private Double grade;// 平均评分
	private Integer viewCount;// 浏览量
	private Integer status;// 状态，技术状态

	//关联实体
	private List<SkillTalk> skillTalk;
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

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Integer getViewCount() {
		return viewCount;
	}

	public void setViewCount(Integer viewCount) {
		this.viewCount = viewCount;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	
	public Double getGrade() {
		return grade;
	}

	public void setGrade(Double grade) {
		this.grade = grade;
	}

	public List<SkillTalk> getSkillTalk() {
		return skillTalk;
	}

	public void setSkillTalk(List<SkillTalk> skillTalk) {
		this.skillTalk = skillTalk;
	}

}
