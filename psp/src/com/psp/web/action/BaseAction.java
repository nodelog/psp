package com.psp.web.action;

import java.io.File;
import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.psp.util.FinalUtil;
import com.psp.web.domain.User;

/**
 * 类名称：BaseAction 类描述：所有action的基类 创建人：王亚超 创建时间：2014-3-13 下午5:10:00
 * 
 * @version 1.0
 */
public class BaseAction extends ActionSupport implements RequestAware,
        SessionAware, ServletRequestAware, ServletResponseAware, Serializable {

    protected static final long serialVersionUID = -180288800522329868L;
    protected Map<String, Object> session;
    protected Map<String, Object> request;
    protected HttpServletRequest httpRequest;
    protected HttpServletResponse httpResponse;
    protected Map<String, Object> dataMap;
    public String target;
    public User user;
    public DecimalFormat decimalFormat;

    public BaseAction() {
        dataMap = new HashMap<String, Object>();
        decimalFormat = new DecimalFormat("0.##");
    }

    public User getSessionUser() {
        user = (User) session.get("user");
        return user;
    }

    public void setSession(Map<String, Object> session) {
        this.session = session;

    }

    public void setRequest(Map<String, Object> request) {
        this.request = request;
    }

    public String execute() throws Exception {
        return SUCCESS;
    }

    public void setServletRequest(HttpServletRequest httpRequest) {
        this.httpRequest = httpRequest;
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    public void setDataMap(Map<String, Object> dataMap) {
        this.dataMap = dataMap;
    }

    public void setServletResponse(HttpServletResponse httpResponse) {
        this.httpResponse = httpResponse;
    }

    /**
     * 添加cookie
     * 
     * @author wangyachao
     * @param key
     * @param value
     *            void   
     * @throws 
     */
    public void addCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(1800);
        cookie.setPath("/");
        httpResponse.addCookie(cookie);
    }

    /**
     * 添加cookie
     * 
     * @author wangyachao
     * @param key
     *            cookie的key
     * @param value
     *            cookie的值
     * @param maxAge
     *            cookie保存时间（秒）   
     * @throws 
     */
    public void addCookie(String key, String value, int maxAge) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");
        httpResponse.addCookie(cookie);
    }

    public String getCookie(String key) {
        String result = "";
        Cookie[] cookies = httpRequest.getCookies();
        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                Cookie cookie = cookies[i];
                if (cookie.getName().equals(key)) {
                    result = cookie.getValue();
                }
            }
        }
        return result;
    }

    public String buildNewFileName(String filename) {
        int index = filename.lastIndexOf('.');
        StringBuffer stringBuffer = new StringBuffer();
        // stringBuffer.append(filename.substring(0, index));
        stringBuffer.append(FinalUtil.DELIMITER);
        stringBuffer.append(System.currentTimeMillis());
        stringBuffer.append(filename.substring(index));
        return stringBuffer.toString();
    }

    public String getFileSize(File file) {
        float fileSize = file.length();// byte
        String autoSize = "K";
        if (fileSize > FinalUtil.GB) {
            fileSize = fileSize / FinalUtil.GB;
            autoSize = "G";
        } else if (fileSize > FinalUtil.MB) {
            fileSize = fileSize / FinalUtil.MB;
            autoSize = "M";

        } else {
            fileSize = fileSize / FinalUtil.KB;
            autoSize = "K";

        }
        autoSize = decimalFormat.format(fileSize) + autoSize;
        return autoSize;
    }

    public String render(String target) {
        this.target = target;
        return SUCCESS;
    }

    public String renderCommon(String target) {
        this.target = target;
        return "common";
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

}
