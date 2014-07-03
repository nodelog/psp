package com.psp.service.impl;

import java.util.List;

import com.psp.dao.AnswerDao;
import com.psp.service.AnswerService;
import com.psp.util.Page;
import com.psp.web.domain.Answer;
import com.psp.web.domain.Problem;
import com.psp.web.domain.User;

public class AnswerServiceImpl implements AnswerService {
	private AnswerDao answerDao;
	public void setAnswerDao(AnswerDao answerDao) {
		this.answerDao = answerDao;
	}
	public Answer findAnswerByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Answer findAnswerById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public String addAnswer(Answer answer) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Answer> listPaging(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteAnswer(Answer answer) {
		// TODO Auto-generated method stub
		
	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateAnswer(Answer answer, int id) {
		// TODO Auto-generated method stub
		
	}
	

}
