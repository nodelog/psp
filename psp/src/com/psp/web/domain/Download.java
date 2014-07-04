package com.psp.web.domain;

import java.sql.Timestamp;

/**
 * 类名称：Download 类描述：下载记录  创建人：王亚超 创建时间：2014-3-7 下午11:28:39
 * 
 * @version 1.0
 */
public class Download extends BaseDomain {

	private static final long serialVersionUID = 551376286309623504L;
	private User user;//n-1
	private Integer type;
	private Integer resource;
	private Timestamp downloadTime;
	private Integer status;
	
	private String resourceName;
	private String resourecUrl;
	private String typeName;
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}


	public Integer getResource() {
		return resource;
	}

	public void setResource(Integer resource) {
		this.resource = resource;
	}

	public Timestamp getDownloadTime() {
		return downloadTime;
	}

	public void setDownloadTime(Timestamp downloadTime) {
		this.downloadTime = downloadTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getResourecUrl() {
		return resourecUrl;
	}

	public void setResourecUrl(String resourecUrl) {
		this.resourecUrl = resourecUrl;
	}

}
