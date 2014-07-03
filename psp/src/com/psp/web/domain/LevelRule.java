package com.psp.web.domain;

import java.util.List;

/**
 * 类名称：LevelRule 类描述：LevelRule 创建人：王亚超 创建时间：2014-3-7 下午11:20:08
 * 
 * @version 1.0
 */
public class LevelRule extends BaseDomain {

	private static final long serialVersionUID = 6818771859987632340L;
	private Integer levelNumber;// 第几等级
	private Integer minScore;// 该等级最小的积分
	private Integer maxScore;// 该等级最大的积分数
	
	//关联实体
	private List<Level> level;
	
	public Integer getLevelNumber() {
		return levelNumber;
	}

	public void setLevelNumber(Integer levelNumber) {
		this.levelNumber = levelNumber;
	}

	public Integer getMinScore() {
		return minScore;
	}

	public void setMinScore(Integer minScore) {
		this.minScore = minScore;
	}

	public Integer getMaxScore() {
		return maxScore;
	}

	public void setMaxScore(Integer maxScore) {
		this.maxScore = maxScore;
	}

	public List<Level> getLevel() {
		return level;
	}

	public void setLevel(List<Level> level) {
		this.level = level;
	}

}
