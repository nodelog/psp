package com.psp.web.action.user;

import java.util.List;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.MessageService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Message;
import com.psp.web.domain.User;

public class MessageAction extends BaseAction implements ModelDriven<Message> {

	private static final long serialVersionUID = -4579521889082357297L;
	private Message message;
	private MessageService messageService;
	private Integer currentPage;

	public void setMessageService(MessageService messageService) {
		this.messageService = messageService;
	}

	public String listPaging() {
		Page page = new Page();
		page.setCurrent(currentPage);
		List<Message> messageList = messageService.listPaging(page,
				getSessionUser());
		request.put("messageList", messageList);
		return render("messageList");
	}

	public String getPageTotal() {
		Integer pageTotal = messageService.getPageTotal(new Page(),
				getSessionUser());
		request.put("pageTotal", pageTotal);
		dataMap.put("pageTotal", pageTotal);
		return SUCCESS;
	}

	public String getNewCount() {
		User user = getSessionUser();
		if (user != null) {
			Integer newCount = messageService.getNewCount(user);
			dataMap.put("newCount", newCount);
		} else {
			dataMap.put("newCount", 0);
		}
		return SUCCESS;
	}

	public String read() {
		messageService.readMessage(message);
		dataMap.put("result", FinalUtil.SUCCESS);
		return SUCCESS;
	}

	public String delete() {
		messageService.deleteMessage(message);
		dataMap.put("result", FinalUtil.SUCCESS);
		return SUCCESS;
	}

	public String loadDetail() {
		Message messageById = messageService.findMessageById(message.getId());
		request.put("message", messageById);
		return render("messageDetail");
	}

	public Message getModel() {
		if (message == null) {
			message = new Message();
		}
		return message;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

}
