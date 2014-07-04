package com.psp.util.email;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.psp.util.FinalUtil;

/**
 * 类名称：SendEmail 类描述：发送邮件 创建人：王亚超 创建时间：2014-3-14 下午4:05:41
 * 
 * @version 1.0
 */
public class Email {

	private String emailContent;
	/**
	 * 发送普通邮件
	 * 
	 * @throws Exception
	 */
	public void doSendNormalMail(String liveCode, String reciver) throws Exception {

		/*
		 * 设置邮件对象
		 */
		try {
			Message message = getMessage(liveCode, reciver);
			message.setContent("Hello", "text/plain"); // 设置邮件格式
			message.setText(emailContent); // 设置邮件体
			message.saveChanges();
			System.out.println("sendNormalEmail() 开始发送邮件……");
			Transport.send(message); // 发送邮件
			System.out.println("发送成功！");

		} catch (MessagingException e) {
			System.out.println("发送失败！");
			e.printStackTrace();
		}

	}

	/**
	 * 发送带附件的邮件
	 * @throws IOException 
	 */
	public void sendEmailWithAttachment(String liveCode, String reciver, String file) throws IOException {
	

		try {
			Message message = getMessage(liveCode, reciver);
			message.setContent("Hello", "text/plain"); // 设置邮件格式

			BodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setText(emailContent);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);
			messageBodyPart = new MimeBodyPart();
			DataSource source = new FileDataSource(file);
			messageBodyPart.setDataHandler(new DataHandler(source));
			String name = file.substring(file.lastIndexOf("/")+1);
			messageBodyPart.setFileName(name);
			multipart.addBodyPart(messageBodyPart);//
			message.setContent(multipart);
			message.saveChanges();
			System.out.println("带附件。 开始发送邮件……");
			Transport.send(message);
			System.out.println("发送成功！");
		} catch (MessagingException e) {
			System.out.println("发送失败！");
			e.printStackTrace();
		}

	}

	/**
	 * 发送带html的邮件
	 * 
	 * @throws UnsupportedEncodingException
	 */

	public void sendEmailWithHtml(String liveCode, String reciver) throws UnsupportedEncodingException {

		try {
			Message message = getMessage(liveCode, reciver);
			Transport.send(message);
			System.out.println("带html。发送成功！");
		} catch (MessagingException e) {
			System.out.println("发送失败！");
			e.printStackTrace();
		}
	}

	/**
	 * 
	* 设置邮件信息
	* @param name
	* @Exception UnsupportedEncodingException
	* @return Message
	 */
	private Message getMessage(String liveCode, String reciver) throws UnsupportedEncodingException {
		Properties prop = new Properties();
		Authenticator auth = new MailAuthenticator();
		prop.put("mail.smtp.host", FinalUtil.EMAIL_HOST);
		prop.put("mail.smtp.auth", "true");
		Session session = Session.getDefaultInstance(prop, auth);
		session.setDebug(true);
		Message message = new MimeMessage(session);
		try {
			message.setSubject(FinalUtil.EMAIL_SUBJECT);// 邮件主题
			StringBuffer content = new StringBuffer(
					"<p>欢迎加入<a herf=\"http://www.psp.com\" target=\"blank\" style=\"color:#0f0\">郑大公益</a>！</p><br/>");
			content.append("您注册的激活码为：<font color=\"red\">");
			content.append(liveCode);
			content.append("</font>");
			message.setContent(content.toString(), "text/html;charset=utf-8");// 邮件内容
			
			StringBuffer contentNoHtml = new StringBuffer("欢迎加入郑大公益！");
			contentNoHtml.append("您注册的激活码为：");
			contentNoHtml.append(liveCode);
			emailContent = contentNoHtml.toString();
//			message.setText(emailContent); // 设置邮件体
			message.setSentDate(new Date());

			Address address = new InternetAddress(FinalUtil.EMAIL_SENDER,
					FinalUtil.HOST_NAME);
			Address toAddress = new InternetAddress(reciver);
			message.setFrom(address);// 发件人
			message.setRecipient(Message.RecipientType.TO, toAddress);// 收件人
			message.saveChanges();
		} catch (MessagingException e) {
			System.out.println("发送失败！");
			e.printStackTrace();
		} 
		return message;
	}

	/**
	 * 测试函数
	 * 
	 * @param args
	 */
	public static void main(String args[]) {
		try {

			// 发送普通邮件
//			new SendEmail().doSendNormalMail("11111111", "wangyachao0991@sina.cn");
//
//			// 发送带html的邮件
			new Email().sendEmailWithHtml("2222222222", "wangyachao0991@sina.cn");

			// 发送带附件的邮件
//			new SendEmail().sendEmailWithAttachment("33333333333", "wangyachao0991@sina.cn","C:/Users/Administrator/Desktop/新建文件夹/changes.html");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}