package com.psp.service.impl;

import java.sql.Timestamp;
import java.util.List;

import com.psp.dao.CategoryDao;
import com.psp.dao.FileDao;
import com.psp.dao.MediaDao;
import com.psp.dao.MessageDao;
import com.psp.dao.UserDao;
import com.psp.service.MediaService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.File;
import com.psp.web.domain.Media;
import com.psp.web.domain.Message;
import com.psp.web.domain.User;

public class MediaServiceImpl implements MediaService {
	private MediaDao mediaDao;
	private CategoryDao categoryDao;
	private UserDao userDao;
	private FileDao fileDao;
	private MessageDao messageDao;

	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}

	public void setFileDao(FileDao fileDao) {
		this.fileDao = fileDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public void setCategoryDao(CategoryDao categoryDao) {
		this.categoryDao = categoryDao;
	}

	public void setMediaDao(MediaDao mediaDao) {
		this.mediaDao = mediaDao;
	}

	public Media findMediaByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Media findMediaById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public void addMedia(Media media) {
		Category category = categoryDao.findCategoryByName(
				FinalUtil.MEDIA_MUSIC, FinalUtil.TYPE_MEDIA);
		media.setCategory(category);
		Integer id = mediaDao.addMedia(media);
		userDao.addScore(media.getUser(), FinalUtil.ADD_MEDIA);
		String title = "我上传了一首音乐@"+media.getName();
		String content =  FinalUtil.MESSAGE_ADD_MUSIC+media.getName();
		addMessage(media.getUser(),title,content);
	}

	public void addMedia(Media media, Integer imageId) {
		Category category = categoryDao.findCategoryByName(
				FinalUtil.MEDIA_FILM, FinalUtil.TYPE_MEDIA);
		media.setCategory(category);
		Integer appId = mediaDao.addMedia(media);
		if (imageId != null) {
			File file = new File();
			file.setId(imageId);
			file.setAppId(appId);
			file.setName(media.getName());
			fileDao.updateFileAppId(file);
		}
		userDao.addScore(media.getUser(), FinalUtil.ADD_MEDIA);
		String title = "我上传了一部电影@"+media.getName();
		String content =  FinalUtil.MESSAGE_ADD_FILM+media.getName();
		addMessage(media.getUser(),title,content);
	}

	public List<Media> listPaging(Page page, Category category) {
		category = categoryDao.findCategoryByName(category.getName(),
				category.getType());
		List<Media> mediaList = mediaDao.listPaging(page, category);
		for (Media media : mediaList) {
			List<File> fileList = fileDao.getFileByApp(FinalUtil.MEDIA_CODE,
					media.getId());
			if (fileList != null && fileList.size() > 0) {
				media.setBgImage(fileList.get(0));
			}
		}
		return mediaList;
	}

	public List<Media> listPaging(Page page, Category category, User user) {
		category = categoryDao.findCategoryByName(category.getName(),
				category.getType());
		List<Media> mediaList = mediaDao.listPaging(page, category, user);
		for (Media media : mediaList) {
			List<File> fileList = fileDao.getFileByApp(FinalUtil.MEDIA_CODE,
					media.getId());
			if (fileList != null && fileList.size() > 0) {
				media.setBgImage(fileList.get(0));
			}
		}
		return mediaList;
	}

	public void deleteMedia(Media media) {
		// TODO Auto-generated method stub

	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateMedia(Media media, int id) {
		// TODO Auto-generated method stub

	}

	public Integer getTotatlByType(Category category) {
		category = categoryDao.findCategoryByName(category.getName(),
				category.getType());
		return mediaDao.getTotatlByType(category);
	}

	public Integer getTotatlByUser(Category category, User user) {
		category = categoryDao.findCategoryByName(category.getName(),
				category.getType());
		return mediaDao.getTotatlByUser(category, user);
	}

	public List<File> loadPicFilm() {
		List<File> fileList = fileDao.getFileByApp(FinalUtil.MEDIA_CODE);
		for (File file : fileList) {
			String appUrl = mediaDao.getUrlById(file.getAppId());
			file.setAppUrl(appUrl);
		}
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
