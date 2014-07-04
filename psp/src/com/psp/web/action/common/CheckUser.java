package com.psp.web.action.common;

import com.psp.service.UserService;
import com.psp.util.FinalUtil;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.User;

/**
 * 类名称：CheckUser 类描述：检查用户名是否存在 创建人：王亚超 创建时间：2014-3-16 下午5:46:44
 * 
 * @version 1.0
 */
public class CheckUser extends BaseAction {
    private static final long serialVersionUID = -1577415178589146231L;
    private UserService userService;
    private String name;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public String execute() throws Exception {
        User user = userService.findUserByName(name);
        if (user != null) {
            dataMap.put("isExists", FinalUtil.TRUE);
            dataMap.put("msg", FinalUtil.USER_NAME_EXISTS);
        } else {
            dataMap.put("isExists", FinalUtil.FALSE);
            dataMap.put("msg", FinalUtil.USER_NAME_EXISTS);
        }
        return SUCCESS;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
