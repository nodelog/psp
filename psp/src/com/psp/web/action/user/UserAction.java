package com.psp.web.action.user;

import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.net.ftp.FTPClient;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.FileService;
import com.psp.service.UserService;
import com.psp.util.FinalUtil;
import com.psp.util.FtpUpload;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.File;
import com.psp.web.domain.User;

public class UserAction extends BaseAction implements ModelDriven<User> {
	private static final long serialVersionUID = -2757204567982322289L;
	private User user;
	private UserService userService;
	private FileService fileService;
	private java.io.File userHead;
	private String userHeadFileName;
	private FtpUpload ftpUpload;
	private String newPassword;
	private String surePassword;

	public void setFtpUpload(FtpUpload ftpUpload) {
		this.ftpUpload = ftpUpload;
	}

	public void setFileService(FileService fileService) {
		this.fileService = fileService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	/**
	 * 用户登录，加入session
	 * 
	 * @author wangyachao
	 * @return String   
	 * @throws 
	 */
	public String login() {
		if (user != null) {
			User userFromDb = userService.login(user);
			// 登陆成功
			if (userFromDb != null) {
				userFromDb.getLevel().getScoreNumber();
				userFromDb.getLevel().getLevelRule().getLevelNumber();
				String path = httpRequest.getContextPath() + "/";
				StringBuffer buffer = new StringBuffer();
				buffer.append(httpRequest.getScheme());
				buffer.append("://");
				String serverName = httpRequest.getServerName();
				buffer.append(serverName);
				buffer.append(":");
				buffer.append(httpRequest.getServerPort());
				String domain = buffer.toString();
				String fileServer = domain + FinalUtil.FILE_SERVER_NAME;
				String ftpServer = FinalUtil.FTP_SERVER_HOST + serverName + "/";
				String domainHost = domain + path;
				String flexServer = domain + FinalUtil.FLEX_SERVER_NAME;
				addCookie("FILE_SERVER_URL", fileServer, 2592000);// 保存一个月,http://localhost:8080/fileServer/
				addCookie("FTP_SERVER_HOST", ftpServer, 2592000);// 保存一个月,ftp://localhost/
				addCookie("DOMAIN_HOST", domainHost, 2592000);// 保存一个月,http://localhost:8080/psp/
				addCookie("FLEX_SERVER_URL", flexServer, 2592000);// 保存一个月,http://localhost:8080/flex/
				session.put("fileServer", fileServer);
				session.put("ftpServer", ftpServer);
				session.put("domainHost", domainHost);
				session.put("flexServer", flexServer);
				// ServletActionContext.getRequest().getSession()
				// .setMaxInactiveInterval(604800);//秒
				List<File> userFile = fileService.getFileByApp(
						FinalUtil.USER_CODE, userFromDb.getId());
				if (userFile != null && userFile.size() > 0) {
					File file = userFile.get(0);
					userFromDb.setHead(fileServer + file.getUrl());
				} else {
					userFromDb.setHead(domainHost + "images/user_head.jpg");

				}
				Integer onlineCount = userService.countOnline();
				session.put("onlineCount", onlineCount);
				session.put("user", userFromDb);
				dataMap.put("result", FinalUtil.SUCCESS);
			} else {
				dataMap.put("result", FinalUtil.ERROR);
			}
		}
		return SUCCESS;
	}

	// 统计在线人数
	public String countOnline() {
		Integer onlineCount = userService.countOnline();
		session.put("onlineCount", onlineCount);// 更新session
		dataMap.put("onlineCount", onlineCount);//
		return SUCCESS;
	}

	/**
	 * 用户退出，清除session
	 * 
	 * @author wangyachao
	 * @return String   
	 * @throws 
	 */
	public String exit() {
		User user = getSessionUser();
		if (user != null) {
			userService.exit(user);
		}
		session.put("user", null);
		return SUCCESS;
	}

	// 修改头像
	public String editHead() {
		String path = FinalUtil.FTP_SERVER_URL + FinalUtil.USER_DIR;// 上传路径
		String ftpFilename = buildNewFileName(userHeadFileName);// 转换服务器中文件名称
		ftpUpload.uploadFile(path, ftpFilename, userHead,
				FTPClient.BINARY_FILE_TYPE);// ftp上传文件
		File imageFile = new File();
		imageFile.setApp(FinalUtil.USER_CODE);
		imageFile.setAppId(getSessionUser().getId());
		imageFile.setName(userHeadFileName);
		imageFile.setSize(getFileSize(userHead));
		imageFile.setTime(new Timestamp(System.currentTimeMillis()));
		imageFile.setStatus(FinalUtil.FILE_NORMAL);
		imageFile.setUrl(FinalUtil.USER_DIR + "/" + ftpFilename);// 保存数据库路径
		File uploadFile = fileService.uploadHead(imageFile);
		User user = getSessionUser();
		user.setHead(session.get("fileServer") + imageFile.getUrl());
		session.put("user", user);
		dataMap.put("imageFile", uploadFile);
		return SUCCESS;
	}

	public String editBase() {
		user.setId(getSessionUser().getId());
		user = userService.editBase(user);
		User sessionUser = getSessionUser();
		sessionUser.setName(user.getName());
		sessionUser.setEmail(user.getEmail());
		sessionUser.setSex(user.getSex());
		session.put("user", sessionUser);
		dataMap.put("userName", user.getName());
		return SUCCESS;
	}

	public String loadIndex() {
		user = userService.findUserById(getSessionUser().getId());
		List<File> userFile = fileService.getFileByApp(FinalUtil.USER_CODE,
				user.getId());
		if (userFile != null && userFile.size() > 0) {
			File file = userFile.get(0);
			user.setHead(session.get("fileServer") + file.getUrl());
		} else {
			user.setHead(session.get("domainHost") + "images/user_head.jpg");
		}
		request.put("user", user);
		return render("personIndex");
	}

	public String editPassword() {
		user.setId(getSessionUser().getId());
		String result = userService.editPassword(user, newPassword,
				surePassword);
		dataMap.put("result", result);
		return SUCCESS;
	}

	public String editEmailLogin() {
		user.setId(getSessionUser().getId());
		userService.editEmailLogin(user);
		return SUCCESS;
	}

	public User getModel() {
		if (user == null) {
			user = new User();
		}
		return user;
	}

	public java.io.File getUserHead() {
		return userHead;
	}

	public void setUserHead(java.io.File userHead) {
		this.userHead = userHead;
	}

	public String getUserHeadFileName() {
		return userHeadFileName;
	}

	public void setUserHeadFileName(String userHeadFileName) {
		this.userHeadFileName = userHeadFileName;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getSurePassword() {
		return surePassword;
	}

	public void setSurePassword(String surePassword) {
		this.surePassword = surePassword;
	}

}
