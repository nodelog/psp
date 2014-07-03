package com.psp.web.action.common;

import org.apache.commons.lang3.StringUtils;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.UserService;
import com.psp.util.FinalUtil;
import com.psp.util.Logger;
import com.psp.util.RandomCode;
import com.psp.util.email.Email;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.User;

/**
 * 类名称：RegisterAction 类描述：RegisterAction 创建人：王亚超 创建时间：2014-3-14 上午9:25:19
 * 
 * @version 1.0
 */
public class RegisterAction extends BaseAction implements ModelDriven<User> {
	private static final long serialVersionUID = -2540651020521344507L;
	private User user = new User();
	private String authCode;
	private String liveCode;
	private UserService userService;
	private Logger logger;
	private Email email;

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public void setLogger(Logger logger) {
		this.logger = logger;
	}

	public void setEmail(Email email) {
		this.email = email;
	}

	// 注册最后一步，持久化注册用户
	public String register() throws Exception {
		String result = checkLiveCode();
		if (StringUtils.equals(FinalUtil.SUCCESS, result)) {
			User registerUser = (User) session.get("registerUser");
			int id = userService.register(registerUser);
			dataMap.put("result", id > 0 ? FinalUtil.SUCCESS : FinalUtil.ERROR);
			dataMap.put("registerUser", registerUser);
			session.put("liveCode", null);
			session.put("registerUser", null);
		} else {
			dataMap.put("result", FinalUtil.ERROR);
			dataMap.put("msg", result);
		}
		return SUCCESS;
	}

	// 注册检查，用户信息保存到session中，邮箱验证通过后才进行注册
	public String registerCheck() throws Exception {
		String authCodeResult = checkAuthCode();
		if (StringUtils.equals(FinalUtil.SUCCESS, authCodeResult)) {
			// 验证用户信息
			String result = userService.rigisterCheck(user);
			if (StringUtils.equals(FinalUtil.SUCCESS, result)) {
				logger.debug("用户注册信息正确");
				session.put("registerUser", user);
				dataMap.put("user", user);
			}
			dataMap.put("msg", result);
		} else {
			dataMap.put("msg", authCodeResult);
		}
		return SUCCESS;
	}

	// 验证验证码
	public String checkAuthCode() {
		if (StringUtils.isEmpty(authCode)) {
			return FinalUtil.AUTHCODE_NULL;
		}
		String authCodeCookie = getCookie("authCode");
		authCodeCookie = authCodeCookie.toUpperCase();
		authCode = authCode.toUpperCase();
		if (StringUtils.isNotEmpty(authCodeCookie)
				&& StringUtils.equals(authCodeCookie, authCode)) {
			return FinalUtil.SUCCESS;
		} else {
			return FinalUtil.AUTHCODE_ERROR;
		}

	}

	// 验证激活码
	public String checkLiveCode() {
		if (StringUtils.isEmpty(liveCode)) {
			return FinalUtil.LIVECODE_NULL;
		}
		String liveCodeCookie = getCookie("liveCode");
		liveCodeCookie = liveCodeCookie.toUpperCase();
		liveCode = liveCode.toUpperCase();
		if (StringUtils.isNotEmpty(liveCodeCookie)
				&& StringUtils.equals(liveCodeCookie, liveCode)) {
			return FinalUtil.SUCCESS;
		} else {
			return FinalUtil.LIVECODE_ERROR;
		}

	}

	public String reSendEmail() throws Exception {
		sendEmail();
		dataMap.put("result", FinalUtil.SUCCESS);
		dataMap.put("msg", FinalUtil.EMAIL_SEND_SUCCESS);
		return SUCCESS;
	}

	public void sendEmail() throws Exception {
		String liveCode = (String) session.get("liveCode");
		if (liveCode == null) {
			liveCode = RandomCode.getRandomCode(6);
			session.put("liveCode", liveCode);
		}
		email.sendEmailWithHtml(liveCode, user.getEmail());
		logger.debug("发送邮件成功");
		addCookie("liveCode", liveCode);
		logger.debug("发送cookie成功");
	}

	public User getModel() {
		return user;
	}

	public String getAuthCode() {
		return authCode;
	}

	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

	public String getLiveCode() {
		return liveCode;
	}

	public void setLiveCode(String liveCode) {
		this.liveCode = liveCode;
	}

}
