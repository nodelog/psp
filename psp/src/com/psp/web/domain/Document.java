package com.psp.web.domain;

import java.sql.Timestamp;
import java.util.List;

/**
 * 类名称：Document 类描述：Document 创建人：王亚超 创建时间：2014-3-7 下午11:19:46
 * 
 * @version 1.0
 */
public class Document extends BaseDomain {

	private static final long serialVersionUID = 2319383429441732824L;
	private User user;// 文档所有者，文档-用户：多对一
	private String name;// 文档名称
	private String url;// 文档所在服务器路径
	private Timestamp uploadTime;// 上传时间
	private String size;// 文档大小
	private Double grade;// 文档平均评分
	private Integer status;// 文档状态
	private Category category;// 文档分类
	private Integer viewCount;
	// 关联实体
	private List<DocumentLog> documentLog;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Timestamp getUploadTime() {
		return uploadTime;
	}

	public void setUploadTime(Timestamp uploadTime) {
		this.uploadTime = uploadTime;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Double getGrade() {
		return grade;
	}

	public void setGrade(Double grade) {
		this.grade = grade;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public List<DocumentLog> getDocumentLog() {
		return documentLog;
	}

	public void setDocumentLog(List<DocumentLog> documentLog) {
		this.documentLog = documentLog;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Integer getViewCount() {
		return viewCount;
	}

	public void setViewCount(Integer viewCount) {
		this.viewCount = viewCount;
	}

}
