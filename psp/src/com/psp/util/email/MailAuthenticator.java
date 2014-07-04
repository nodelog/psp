package com.psp.util.email;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

/**
 * 类名称：MailAuthenticator 类描述：邮件服务器认证 创建人：王亚超 创建时间：2014-3-14 下午4:05:41
 * 
 * @version 1.0
 */
public class MailAuthenticator extends Authenticator {
    private final static String EMAIL_USER = "wangyachao0991@sina.cn";
    private final static String EMAIL_PASSWORD = "wangyaWOAINI51";

    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(EMAIL_USER, EMAIL_PASSWORD);
    }
}
