package com.psp.web.action.user;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.DownloadService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Category;
import com.psp.web.domain.Document;
import com.psp.web.domain.Download;
import com.psp.web.domain.Media;
import com.psp.web.domain.Software;

public class DownloadAction extends BaseAction implements ModelDriven<Download> {
	private static final long serialVersionUID = 1275207567886172658L;
	private Download download;
	private String target;
	private Integer categoryId;
	private Integer currentPage;
	private DownloadService downloadService;

	public void setDownloadService(DownloadService downloadService) {
		this.downloadService = downloadService;
	}

	// 加载首页
	public String downloadIndex() {
		Map<String, List<Category>> categoryMap = downloadService
				.loadCategory();
		request.put("mediaCategory", categoryMap.get("mediaCategory"));
		request.put("documentCategory", categoryMap.get("documentCategory"));
		request.put("softwareCategory", categoryMap.get("softwareCategory"));
		Integer pageTotal = downloadService.getPageTotal(new Page(),getSessionUser());
		request.put("pageTotal", pageTotal);
		return render("downloadIndex");
	}

	// 加载资源列表
	public String loadList() {
		Page page = new Page();
		page.setCurrent(currentPage > 0 ? currentPage : 1);
		if (categoryId != null) {
			Category category = downloadService.getCategoryById(categoryId);
			if (category != null) {
				request.put("categoryName", category.getName());
				request.put("categoryId", category.getId());
				if (category.getType() == FinalUtil.TYPE_MEDIA) {
					List<Media> mediaList = downloadService.mediaList(category,
							page);
					request.put("downloadList", mediaList);
				} else if (category.getType() == FinalUtil.TYPE_DOCUMENT) {
					List<Document> documentList = downloadService.documentList(
							category, page);
					request.put("downloadList", documentList);
				} else {
					List<Software> softwareList = downloadService.softwareList(
							category, page);
					request.put("downloadList", softwareList);
				}
				return render("mediaList");
			} else {
				return "error";
			}
		} else {
			List<Download> listPaging = downloadService.listPaging(page,getSessionUser());
			request.put("downloadList", listPaging);
			return render("userDownload");
		}
	}
	public String addDownload(){
		download.setUser(getSessionUser());
		download.setDownloadTime(new Timestamp(System.currentTimeMillis()));
		download.setStatus(FinalUtil.DOWNLOAD_ENBLE);
		download.setType(categoryId);
		downloadService.addDownload(download);
		return SUCCESS;
	}
	public Download getModel() {
		if (download == null) {
			download = new Download();
		}
		return download;
	}

	public String render(String target) {
		this.target = target;
		return SUCCESS;
	}

	public String renderCommon(String target) {
		this.target = target;
		return "common";
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

}
