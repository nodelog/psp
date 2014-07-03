package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：Media 类描述：Media 创建人：王亚超 创建时间：2014-3-7 下午11:20:35
 * 
 * @version 1.0
 */
public class Media extends BaseDomain {

	private static final long serialVersionUID = -3033994462437784582L;
	private User user;// 上传者 n-1
	private String name;// 媒体名称
	private Category category;// 媒体分类 n-1
	private Timestamp uploadTime;// 上传时间
	private String size;// 媒体大小
	private Integer status;// 媒体状态，是否支持在线播放）
	private Double grade;// 文档平均评分
	private String url;
	private File bgImage;

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


	public Double getGrade() {
		return grade;
	}

	public void setGrade(Double grade) {
		this.grade = grade;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public File getBgImage() {
		return bgImage;
	}

	public void setBgImage(File bgImage) {
		this.bgImage = bgImage;
	}

	

}
