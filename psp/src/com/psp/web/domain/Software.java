package com.psp.web.domain;

import java.sql.Timestamp;
import java.util.List;

/**
 * 类名称：Software 类描述：软件中心  创建人：王亚超 创建时间：2014-3-7 下午11:27:10
 * 
 * @version 1.0
 */
public class Software extends BaseDomain {

	private static final long serialVersionUID = -1642430516330559952L;
	private User user;// 上传者n-1
	private Category category;//n-1
	private String name;// 软件名称
	private String url;// 软件下载地址
	private Timestamp uploadTime;// 上传时间
	private String size;// 大小
	private Double grade;// 评分
	private Integer status;// 状态
	private String introduction;
	
	private File bgImage;
	//关联实体
	private List<SoftwareLog> softwareLog;
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

	public List<SoftwareLog> getSoftwareLog() {
		return softwareLog;
	}

	public void setSoftwareLog(List<SoftwareLog> softwareLog) {
		this.softwareLog = softwareLog;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public File getBgImage() {
		return bgImage;
	}

	public void setBgImage(File bgImage) {
		this.bgImage = bgImage;
	}



}
