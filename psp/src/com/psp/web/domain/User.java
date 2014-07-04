package com.psp.web.domain;

import java.sql.Timestamp;
import java.util.List;

/**
 * 类名称：User 类描述：用户中心 创建人：王亚超 创建时间：2014-3-7 下午11:27:39
 * 
 * @version 1.0
 */
public class User extends BaseDomain {

	private static final long serialVersionUID = -1664327817052392822L;
	private String name;// 用户名
	private String password;// 密码，32位加密
	private String email;// 绑定邮箱
	private Boolean emailLogin;// 绑定邮箱是否可作为登录名
	private String validationProblem;// 验证问题
	private String validationAnswer;// 验证问题答案
	private Integer status;// 状态（在线0，离线1，未激活2）
	private Level level;//用户等级
	private Integer sex;
	private Timestamp registerTime;
	//不关联字段
	private String head;//用户头像
	// 关联实体
	private List<Answer> answers;
	private List<Problem> problem;
	private List<Document> document;
	private List<DocumentLog> documentLog;
	private List<DocumentLog> replayDocumentLog;
	private List<Download> download;
	private List<Friend> firstFriend;
	private List<Friend> secondFriend;
	private List<Message> reciver;
	private List<Need> need;//用户发布的需求
	private List<PublicInterestLog> publicInterestLog;//用户参加公益活动
	private List<ScoreLog> scoreLog;//用户积分记录
	private List<Skill> skill;//用户技术讨论者
	private List<SkillTalk> skillTalk;//用户技术讨论者
	private List<SkillTalk> replaySkillTalk;//用户技术讨论回复者
	private List<Software> software;//用户上传的软件
	private List<SoftwareLog> softwareLog;//用户上传的软件日志记录
	private List<SoftwareLog> replaySoftwareLog;//用户上传的软件日志记录
	private List<Solve> solve;//用户提出的需求解决方案
	public User(){}
	public User(Integer id, String name){
		this.id = id;
		this.name = name;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getEmailLogin() {
		return emailLogin;
	}

	public void setEmailLogin(Boolean emailLogin) {
		this.emailLogin = emailLogin;
	}

	public String getValidationProblem() {
		return validationProblem;
	}

	public void setValidationProblem(String validationProblem) {
		this.validationProblem = validationProblem;
	}

	public String getValidationAnswer() {
		return validationAnswer;
	}

	public void setValidationAnswer(String validationAnswer) {
		this.validationAnswer = validationAnswer;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}

	public List<Problem> getProblem() {
		return problem;
	}

	public void setProblem(List<Problem> problem) {
		this.problem = problem;
	}

	public List<Document> getDocument() {
		return document;
	}

	public void setDocument(List<Document> document) {
		this.document = document;
	}

	public List<DocumentLog> getDocumentLog() {
		return documentLog;
	}

	public void setDocumentLog(List<DocumentLog> documentLog) {
		this.documentLog = documentLog;
	}

	public List<Download> getDownload() {
		return download;
	}

	public void setDownload(List<Download> download) {
		this.download = download;
	}

	public List<Friend> getFirstFriend() {
		return firstFriend;
	}

	public void setFirstFriend(List<Friend> firstFriend) {
		this.firstFriend = firstFriend;
	}

	public List<Friend> getSecondFriend() {
		return secondFriend;
	}

	public void setSecondFriend(List<Friend> secondFriend) {
		this.secondFriend = secondFriend;
	}

	public List<DocumentLog> getReplayDocumentLog() {
		return replayDocumentLog;
	}

	public void setReplayDocumentLog(List<DocumentLog> replayDocumentLog) {
		this.replayDocumentLog = replayDocumentLog;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}

	public List<Message> getReciver() {
		return reciver;
	}

	public void setReciver(List<Message> reciver) {
		this.reciver = reciver;
	}

	public List<Need> getNeed() {
		return need;
	}

	public void setNeed(List<Need> need) {
		this.need = need;
	}

	public List<PublicInterestLog> getPublicInterestLog() {
		return publicInterestLog;
	}

	public void setPublicInterestLog(List<PublicInterestLog> publicInterestLog) {
		this.publicInterestLog = publicInterestLog;
	}

	public List<ScoreLog> getScoreLog() {
		return scoreLog;
	}

	public void setScoreLog(List<ScoreLog> scoreLog) {
		this.scoreLog = scoreLog;
	}

	public List<SkillTalk> getSkillTalk() {
		return skillTalk;
	}

	public void setSkillTalk(List<SkillTalk> skillTalk) {
		this.skillTalk = skillTalk;
	}

	public List<SkillTalk> getReplaySkillTalk() {
		return replaySkillTalk;
	}

	public void setReplaySkillTalk(List<SkillTalk> replaySkillTalk) {
		this.replaySkillTalk = replaySkillTalk;
	}

	public List<Software> getSoftware() {
		return software;
	}

	public void setSoftware(List<Software> software) {
		this.software = software;
	}

	public List<SoftwareLog> getSoftwareLog() {
		return softwareLog;
	}

	public void setSoftwareLog(List<SoftwareLog> softwareLog) {
		this.softwareLog = softwareLog;
	}

	public List<SoftwareLog> getReplaySoftwareLog() {
		return replaySoftwareLog;
	}

	public void setReplaySoftwareLog(List<SoftwareLog> replaySoftwareLog) {
		this.replaySoftwareLog = replaySoftwareLog;
	}

	public List<Solve> getSolve() {
		return solve;
	}

	public void setSolve(List<Solve> solve) {
		this.solve = solve;
	}

	public List<Skill> getSkill() {
		return skill;
	}

	public void setSkill(List<Skill> skill) {
		this.skill = skill;
	}
	public String getHead() {
		return head;
	}
	public void setHead(String head) {
		this.head = head;
	}
	public Integer getSex() {
		return sex;
	}
	public void setSex(Integer sex) {
		this.sex = sex;
	}
	public Timestamp getRegisterTime() {
		return registerTime;
	}
	public void setRegisterTime(Timestamp registerTime) {
		this.registerTime = registerTime;
	}
	
}
