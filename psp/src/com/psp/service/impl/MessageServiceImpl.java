package com.psp.service.impl;

import java.util.List;

import com.psp.dao.MessageDao;
import com.psp.service.MessageService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Message;
import com.psp.web.domain.User;

public class MessageServiceImpl implements MessageService {
	private MessageDao messageDao;
	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}
	public Message findMessageByName(String name) {
		
		return null;
	}

	public Message findMessageById(Integer id) {
		return messageDao.findMessageById(id);
	}

	public void addMessage(Message message) {
		messageDao.addMessage(message);
	}

	public List<Message> listPaging(Page page,User user) {
		return messageDao.listPaging(page, user);
	}

	public void deleteMessage(Message message) {
		message=messageDao.findMessageById(message.getId());
		message.setStatus(FinalUtil.MESSAGE_DELETE);
	}

	public Integer getPageTotal(Page page,User user) {
		return messageDao.getPageTotal(page,user);
	}

	public void updateMessage(Message message, int id) {
		
	}
	public void readMessage(Message message) {
		message=messageDao.findMessageById(message.getId());
		message.setStatus(FinalUtil.MESSAGE_OLD);
	}
	public Integer getNewCount(User user) {
		return messageDao.getNewCount(user);
	}

}
