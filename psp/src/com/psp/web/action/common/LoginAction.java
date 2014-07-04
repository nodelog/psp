package com.psp.web.action.common;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.UserService;
import com.psp.util.FinalUtil;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.User;

/**
 * 类名称：LoginAction
 * 类描述：LoginAction
 * 创建人：王亚超
 * 创建时间：2014-3-14 上午9:19:43
 * @version 1.0
 */
public class LoginAction extends BaseAction implements ModelDriven<User> {
	private static final long serialVersionUID = -4189168932237188894L;
	private User user;
	private UserService userService;
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	/**
	* 用户登录，加入session
	* @author wangyachao
	* @return String   
	* @throws 
	*/
	public String login() {
		if(user!=null){
			User userFromDb = userService.login(user);
			//登陆成功那个
			if(userFromDb != null){
				session.put("user", userFromDb);
				dataMap.put("result", FinalUtil.SUCCESS);
			} else {
				dataMap.put("result", FinalUtil.ERROR);
			}
		}
		return SUCCESS;
	} 
	
	/**
	* 用户退出，清除session
	* @author wangyachao
	* @return String   
	* @throws 
	*/
	public String exit() {
		session.put("user", null);
		return SUCCESS;
	} 
	
	public User getModel() {
		if (user == null) {
			user = new User();
		}
		return user;
	}
}
