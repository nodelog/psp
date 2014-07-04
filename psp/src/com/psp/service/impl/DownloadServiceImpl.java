package com.psp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.psp.dao.CategoryDao;
import com.psp.dao.DocumentDao;
import com.psp.dao.DownloadDao;
import com.psp.dao.MediaDao;
import com.psp.dao.SoftwareDao;
import com.psp.service.DownloadService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Document;
import com.psp.web.domain.Download;
import com.psp.web.domain.Media;
import com.psp.web.domain.Software;
import com.psp.web.domain.User;

public class DownloadServiceImpl implements DownloadService {
	private DownloadDao downloadDao;
	private CategoryDao categoryDao;
	private MediaDao mediaDao;
	private DocumentDao documentDao;
	private SoftwareDao softwareDao;

	public void setSoftwareDao(SoftwareDao softwareDao) {
		this.softwareDao = softwareDao;
	}

	public void setDocumentDao(DocumentDao documentDao) {
		this.documentDao = documentDao;
	}

	public void setMediaDao(MediaDao mediaDao) {
		this.mediaDao = mediaDao;
	}

	public void setCategoryDao(CategoryDao categoryDao) {
		this.categoryDao = categoryDao;
	}

	public void setDownloadDao(DownloadDao downloadDao) {
		this.downloadDao = downloadDao;
	}

	public void addDownload(Download download) {
		downloadDao.addDownload(download);
	}

	public List<Download> listPaging(Page page) {
		List<Download> listPaging = downloadDao.listPaging(page);
		for (Download download : listPaging) {
			Category category = categoryDao
					.findCategoryById(download.getType());
			download.setTypeName(category.getName());
			if (category.getType() == FinalUtil.TYPE_MEDIA) {
				Media media = mediaDao.findMediaById(download.getResource());
				if (media != null) {
					download.setResourceName(media.getName());
					download.setResourecUrl(media.getUrl());
				}
			} else if (category.getType() == FinalUtil.TYPE_DOCUMENT) {
				Document document = documentDao.findDocumentById(download
						.getResource());
				if (document != null) {
					download.setResourceName(document.getName());
					download.setResourecUrl(document.getUrl());
				}
			} else {
				Software software = softwareDao.findSoftwareFileById(download
						.getResource());
				if (software != null) {
					download.setResourceName(software.getName());
					download.setResourecUrl(software.getUrl());
				}
			}
		}
		return listPaging;
	}

	public List<Download> listPaging(Page page, User user) {
		List<Download> listPaging = downloadDao.listPaging(page, user);
		for (Download download : listPaging) {
			Category category = categoryDao
					.findCategoryById(download.getType());
			download.setTypeName(category.getName());
			if (category.getType() == FinalUtil.TYPE_MEDIA) {
				Media media = mediaDao.findMediaById(download.getResource());
				if (media != null) {
					download.setResourceName(media.getName());
					download.setResourecUrl(media.getUrl());
				}
			} else if (category.getType() == FinalUtil.TYPE_DOCUMENT) {
				Document document = documentDao.findDocumentById(download
						.getResource());
				if (document != null) {
					download.setResourceName(document.getName());
					download.setResourecUrl(document.getUrl());
				}
			} else {
				Software software = softwareDao.findSoftwareFileById(download
						.getResource());
				if (software != null) {
					download.setResourceName(software.getName());
					download.setResourecUrl(software.getUrl());
				}
			}
		}
		return listPaging;
	}

	public Integer getPageTotal(Page page) {
		Integer pageTotal = downloadDao.getPageTotal(page);
		return pageTotal;
	}

	public Integer getPageTotal(Page page, User user) {
		Integer pageTotal = downloadDao.getPageTotal(page, user);
		return pageTotal;
	}

	public Map<String, List<Category>> loadCategory() {
		List<Category> mediaCategory = categoryDao
				.loadCategoryByType(FinalUtil.TYPE_MEDIA);
		List<Category> documentCategory = categoryDao
				.loadCategoryByType(FinalUtil.TYPE_DOCUMENT);
		List<Category> softwareCategory = categoryDao
				.loadCategoryByType(FinalUtil.TYPE_SOFTWARE);
		for (Category category : mediaCategory) {
			category.setPageTotal(getPageTotal(category));
		}
		for (Category category : documentCategory) {
			category.setPageTotal(getPageTotal(category));
		}
		for (Category category : softwareCategory) {
			category.setPageTotal(getPageTotal(category));
		}
		Map<String, List<Category>> categoryMap = new HashMap<String, List<Category>>();
		categoryMap.put("mediaCategory", mediaCategory);
		categoryMap.put("documentCategory", documentCategory);
		categoryMap.put("softwareCategory", softwareCategory);
		return categoryMap;
	}

	public List<Media> mediaList(Category category, Page page) {
		List<Media> list = mediaDao.listPaging(page, category);
		return list;
	}

	public Category getCategoryById(Integer id) {
		return categoryDao.findCategoryById(id);
	}

	public List<Document> documentList(Category category, Page page) {
		List<Document> list = documentDao.listPaging(page, category);
		return list;
	}

	public List<Software> softwareList(Category category, Page page) {
		List<Software> list = softwareDao.listPagingByFile(category, page);
		return list;
	}

	public Integer getPageTotal(Category category) {
		Integer total = 0;
		if (category.getType() == FinalUtil.TYPE_MEDIA) {
			total = mediaDao.getTotatlByType(category);
		} else if (category.getType() == FinalUtil.TYPE_DOCUMENT) {
			total = documentDao.getPageTotal(category);
		} else {
			total = softwareDao.getPageTotal(category, FinalUtil.SOFTWARE_FILE);
		}
		return total;
	}

}
