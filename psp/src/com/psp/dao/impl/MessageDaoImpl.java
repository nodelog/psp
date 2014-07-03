package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.MessageDao;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Message;
import com.psp.web.domain.User;

public class MessageDaoImpl extends BaseDao<Message> implements MessageDao {

	public Message findMessageByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Message findMessageById(Integer id) {
		return super.getEntityById(new Message(), id);
	}

	public void addMessage(Message message) {
		super.addEntity(message);
	}

	public List<Message> listPaging(Page page,User user) {
		init();
		int index = (page.getCurrent() - 1) * page.getEach();
		hql = "from Message as e where e.receiver=:user and e.status!=:status order by sendTime desc";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setInteger("status", FinalUtil.MESSAGE_DELETE);
		query.setFirstResult(index);
		query.setMaxResults(page.getEach());
		List<Message> objectList = query.list();
		return objectList;
	}

	public void deleteMessage(Message message) {
		
	}

	public Integer getPageTotal(Page page,User user) {
		init();
		hql = "select count(*) from Message e where  e.receiver=:user and e.status!=:status";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setInteger("status", FinalUtil.MESSAGE_DELETE);
		Long total = (Long) query.uniqueResult();
		int each = page.getEach();
		int totalPage = total != null ? total.intValue() : 0;
		Integer count = totalPage / each + (totalPage % each == 0 ? 0 : 1);
		return count;
	}

	public void updateMessage(Message message, int id) {
		
	}

	public Integer getNewCount(User user) {
		init();
		hql = "select count(*) from Message e where e.receiver=:user and e.status=:status";
		query = session.createQuery(hql);
		query.setEntity("user", user);
		query.setInteger("status", FinalUtil.MESSAGE_NEW);
		Long total = (Long) query.uniqueResult();
		return total!=null?total.intValue():0;
	}

}
