package com.psp.web.domain;


/**
 * 类名称：Category 类描述：Category 创建人：王亚超 创建时间：2014-3-7 下午11:18:53
 * 
 * @version 1.0
 */
public class Category extends BaseDomain {

	private static final long serialVersionUID = -492756461067621346L;
	private String name;// 类别名称
	private Integer type;// 类别分类
	private Integer status;// 类别状态
	private Integer pageTotal;

	// 关联实体
//	private List<Problem> problem;// 问题分类
//	private List<Need> need;// 分类的需求
//	private List<Software> software;// 软件分类
//	private List<Document> document;// 文档分类
//	private List<Media> media;// 多媒体分类

	public Category() {
	}

	public Category(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getPageTotal() {
		return pageTotal;
	}

	public void setPageTotal(Integer pageTotal) {
		this.pageTotal = pageTotal;
	}

//	public List<Problem> getProblem() {
//		return problem;
//	}
//
//	public void setProblem(List<Problem> problem) {
//		this.problem = problem;
//	}
//
//	public List<Need> getNeed() {
//		return need;
//	}
//
//	public void setNeed(List<Need> need) {
//		this.need = need;
//	}
//
//	public List<Software> getSoftware() {
//		return software;
//	}
//
//	public void setSoftware(List<Software> software) {
//		this.software = software;
//	}
//
//	public List<Document> getDocument() {
//		return document;
//	}
//
//	public void setDocument(List<Document> document) {
//		this.document = document;
//	}
//
//	public List<Media> getMedia() {
//		return media;
//	}
//
//	public void setMedia(List<Media> media) {
//		this.media = media;
//	}

	
}
