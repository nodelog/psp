package com.psp.service.impl;

import java.sql.Timestamp;
import java.util.List;

import com.psp.dao.CategoryDao;
import com.psp.dao.DocumentDao;
import com.psp.dao.MessageDao;
import com.psp.dao.UserDao;
import com.psp.service.DocumentService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Document;
import com.psp.web.domain.DocumentLog;
import com.psp.web.domain.Message;
import com.psp.web.domain.User;

public class DocumentServiceImpl implements DocumentService {
	private DocumentDao documentDao;
	private CategoryDao categoryDao;
	private UserDao userDao;
	private MessageDao messageDao;

	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public void setCategoryDao(CategoryDao categoryDao) {
		this.categoryDao = categoryDao;
	}

	public void setDocumentDao(DocumentDao documentDao) {
		this.documentDao = documentDao;
	}

	public Document findDocumentByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Document findDocumentById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public void addDocument(Document document) {
		documentDao.addDocument(document);
		userDao.addScore(document.getUser(), FinalUtil.ADD_DOCUMENT);
		String title = "我上传了一个文档@"+document.getName();
		String content =  FinalUtil.MESSAGE_ADD_DOCUMENT+document.getName();
		addMessage(document.getUser(),title,content);
	}

	public List<Document> listPaging(Page page) {
		List<Document> list = documentDao.listPaging(page);
		return list;
	}

	public void deleteDocument(Document document) {
		// TODO Auto-generated method stub

	}

	public Integer getPageTotal() {
		Integer pageTotal = documentDao.getPageTotal();
		return pageTotal;
	}

	public void updateDocument(Document document, int id) {
		// TODO Auto-generated method stub

	}

	public Integer getPageTotal(User user) {
		Integer pageTotal = documentDao.getPageTotal(user);
		return pageTotal;
	}

	public List<Category> loadCategory() {
		List<Category> list = categoryDao
				.loadCategoryByType(FinalUtil.TYPE_DOCUMENT);
		for (Category category : list) {
			Integer pageTotal = documentDao.getPageTotal(category);
			category.setPageTotal(pageTotal);
		}
		return list;
	}

	public List<Document> listPaging(Page page, User user) {
		List<Document> list = documentDao.listPaging(page, user);
		return list;
	}

	public List<Document> listPaging(Page page, Category category) {
		List<Document> list = documentDao.listPaging(page, category);
		return list;
	}

	public void addView(Document document) {
		document = documentDao.findDocumentById(document.getId());
		document.setViewCount(document.getViewCount() + 1);
		DocumentLog documentLog = new DocumentLog();
		documentLog.setAction(FinalUtil.DOCUMENT_VIEW);
		documentLog.setActionTime(new Timestamp(System.currentTimeMillis()));
		documentLog.setDocument(document);
		documentLog.setUser(document.getUser());
		documentDao.addLog(documentLog);// 添加日志
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
