package com.psp.service.impl;

import java.util.List;

import com.psp.dao.ScoreDao;
import com.psp.service.ScoreService;
import com.psp.util.Page;
import com.psp.web.domain.Score;

public class ScoreServiceImpl implements ScoreService {
	private ScoreDao scoreDao;
	public void setScoreDao(ScoreDao scoreDao) {
		this.scoreDao = scoreDao;
	}
	public Score findScoreByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	public Score findScoreById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public String addScore(Score score) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Score> listPaging(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteScore(Score score) {
		// TODO Auto-generated method stub
		
	}

	public Integer getPageTotal(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateScore(Score score, int id) {
		// TODO Auto-generated method stub
		
	}

}
