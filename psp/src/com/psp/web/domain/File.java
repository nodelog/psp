package com.psp.web.domain;

import java.sql.Timestamp;

public class File extends BaseDomain{
	
	private static final long serialVersionUID = -6809834137547023431L;
	private String name;
	private String url;
	private String size;
	private Timestamp time;
	private Integer status;
	private Integer app;
	private Integer appId;
	private String appUrl;
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
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public Timestamp getTime() {
		return time;
	}
	public void setTime(Timestamp time) {
		this.time = time;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getApp() {
		return app;
	}
	public void setApp(Integer app) {
		this.app = app;
	}
	public Integer getAppId() {
		return appId;
	}
	public void setAppId(Integer appId) {
		this.appId = appId;
	}
	public String getAppUrl() {
		return appUrl;
	}
	public void setAppUrl(String appUrl) {
		this.appUrl = appUrl;
	}
	

}
