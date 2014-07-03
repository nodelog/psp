package com.psp.service.impl;

import java.sql.Timestamp;
import java.util.List;

import com.psp.dao.CategoryDao;
import com.psp.dao.FileDao;
import com.psp.dao.MessageDao;
import com.psp.dao.SoftwareDao;
import com.psp.dao.UserDao;
import com.psp.service.SoftwareService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.File;
import com.psp.web.domain.Media;
import com.psp.web.domain.Message;
import com.psp.web.domain.Software;
import com.psp.web.domain.SoftwareLog;
import com.psp.web.domain.User;

public class SoftwareServiceImpl implements SoftwareService {
	private SoftwareDao softwareDao;
	private CategoryDao categoryDao;
	private FileDao fileDao;
	private UserDao userDao;
	private MessageDao messageDao;

	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public void setFileDao(FileDao fileDao) {
		this.fileDao = fileDao;
	}

	public void setCategoryDao(CategoryDao categoryDao) {
		this.categoryDao = categoryDao;
	}

	public void setSoftwareDao(SoftwareDao softwareDao) {
		this.softwareDao = softwareDao;
	}

	public Software findSoftwareByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Software findSoftwareById(Integer id) {
		Software software = softwareDao.findSoftwareById(id);
		List<File> fileList = fileDao.getFileByApp(FinalUtil.SOFTWARE_CODE,
				software.getId());
		if (fileList != null && fileList.size() > 0) {
			software.setBgImage(fileList.get(0));
		}
		return software;
	}

	public void addSoftware(Software software) {
		Category category = categoryDao.findCategoryById(software.getCategory()
				.getId());
		software.setCategory(category);
		Integer appId = softwareDao.addSoftware(software);
		userDao.addScore(software.getUser(), FinalUtil.ADD_SOFTWARE);
		String title = "我分享了一个软件链接@"+software.getName();
		String content =  FinalUtil.MESSAGE_SHARE_LINK+software.getName();
		addMessage(software.getUser(),title,content);
	}

	public void addSoftware(Software software, Integer imageId) {
		Category category = categoryDao.findCategoryById(software.getCategory()
				.getId());
		software.setCategory(category);
		Integer appId = softwareDao.addSoftware(software);
		if (imageId != null) {
			File file = new File();
			file.setId(imageId);
			file.setAppId(appId);
			file.setName(software.getName());
			fileDao.updateFileAppId(file);
		}
		userDao.addScore(software.getUser(), FinalUtil.ADD_SOFTWARE);
		String title = "我上传了一个软件@"+software.getName();
		String content =  FinalUtil.MESSAGE_ADD_SOFTWARE+software.getName();
		addMessage(software.getUser(),title,content);
	}

	public List<Software> listPaging(Page page) {
		List<Software> list = softwareDao.listPaging(page);
		return list;
	}

	public List<Software> listPaging(User user, Page page, Integer status) {
		List<Software> list = softwareDao.listPaging(user, page, status);
		for (Software software : list) {
			List<File> fileList = fileDao.getFileByApp(FinalUtil.SOFTWARE_CODE,
					software.getId());
			if (fileList != null && fileList.size() > 0) {
				software.setBgImage(fileList.get(0));
			}
		}
		return list;
	}

	public void deleteSoftware(Software software) {
		// TODO Auto-generated method stub

	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer getPageTotal(Category category) {
		Integer total = 0;
		total = softwareDao.getPageTotal(category);
		return total;
	}

	public void updateSoftware(Software software, int id) {
		// TODO Auto-generated method stub

	}

	public List<Category> loadCategory() {
		List<Category> list = categoryDao
				.loadCategoryByType(FinalUtil.TYPE_SOFTWARE);
		for (Category category : list) {
			category.setPageTotal(getPageTotal(category));
		}
		return list;
	}

	public Category getCategoryById(Integer id) {
		return categoryDao.findCategoryById(id);
	}

	public Integer getPageTotal(User user, Integer status) {
		Integer pageTotal = softwareDao.getPageTotal(user, status);
		return pageTotal;
	}

	public List<Software> listPaging(Category category, Page page) {
		List<Software> list = softwareDao.listPaging(category, page);
		for (Software software : list) {
			List<File> fileList = fileDao.getFileByApp(FinalUtil.SOFTWARE_CODE,
					software.getId());
			if (fileList != null && fileList.size() > 0) {
				software.setBgImage(fileList.get(0));
			}
		}
		return list;
	}

	public void addGrade(Software software) {
		SoftwareLog softwareLog = new SoftwareLog();
		softwareLog.setAction(FinalUtil.SOFTWARE_GRADE);
		softwareLog.setActionTime(new Timestamp(System.currentTimeMillis()));
		softwareLog.setContent(software.getGrade().toString());
		softwareLog.setSoftware(software);
		softwareLog.setUser(software.getUser());
		softwareDao.addLog(softwareLog);// 添加日志
		List<SoftwareLog> logList = softwareDao.getLogByAction(software,
				FinalUtil.SOFTWARE_GRADE);
		int count = 1;
		if (logList != null) {
			count = logList.size();
		}
		double grade = 0D;
		for (SoftwareLog log : logList) {
			grade += Double.parseDouble((log.getContent()));
		}
		grade = grade / count;
		Software softwareDb = softwareDao.findSoftwareById(software.getId());
		softwareDb.setGrade(grade);
		String title = software.getUser().getName()+"给我的软件@"+softwareDb.getName()+"打了"+software.getGrade().toString()+"分";
		addMessage(softwareDb.getUser(),title,title);

	}

	public Integer getGradeByUser(Software software) {
		Integer grade = softwareDao.getGradeByUser(software);
		return grade;
	}

	public void addView(Software software) {
		SoftwareLog softwareLog = new SoftwareLog();
		softwareLog.setAction(FinalUtil.SOFTWARE_VIEW);
		softwareLog.setActionTime(new Timestamp(System.currentTimeMillis()));
		softwareLog.setSoftware(software);
		softwareLog.setUser(software.getUser());
		softwareDao.addLog(softwareLog);// 添加日志

	}

	public List<SoftwareLog> getLogBySoftware(Software software) {
		List<SoftwareLog> list = softwareDao.getLogBySoftware(software);
		return list;
	}

	public List<File> loadPic() {
		List<File> fileList = fileDao.getFileByApp(FinalUtil.SOFTWARE_CODE);
		// for (File file : fileList) {
		// String appUrl = softwareDao.getUrlById(file.getAppId());
		// file.setAppUrl(appUrl);
		// }
		return fileList;
	}

	private void addMessage(User user, String title, String content) {
		Message message = new Message();
		message.setReceiver(user);
		message.setTitle(title);
		message.setContent(content);
		message.setSendTime(new Timestamp(System.currentTimeMillis()));
		message.setStatus(FinalUtil.MESSAGE_NEW);
		messageDao.addMessage(message);
	}

}
