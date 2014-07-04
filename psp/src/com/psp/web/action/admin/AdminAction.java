package com.psp.web.action.admin;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.AdminService;
import com.psp.util.FinalUtil;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Admin;

/**
 * 类名称：AdminAction 类描述：AdminAction 创建人：王亚超 创建时间：2014-3-13 下午6:07:30
 * 
 * @version 1.0
 */
public class AdminAction extends BaseAction implements ModelDriven<Admin> {
    private static final long serialVersionUID = -1507177504969949207L;
    private Admin admin;
    private AdminService adminService;

    public void setAdminService(AdminService adminService) {
        this.adminService = adminService;
    }

    public String login() throws Exception {
        admin = adminService.login(admin);
        if (admin != null) {
            session.put("admin", admin);
            dataMap.put("result", FinalUtil.SUCCESS);
        } else {
            session.put("admin", null);
            dataMap.put("result", FinalUtil.ERROR);
        }
        return SUCCESS;
    }

    public String exit() {
        session.put("admin", null);
        return SUCCESS;
    }

    public Admin getModel() {
        if (admin == null) {
            admin = new Admin();
        }
        return admin;
    }

}
