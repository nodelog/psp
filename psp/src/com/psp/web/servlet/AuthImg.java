package com.psp.web.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.psp.util.AutoCode;

public class AuthImg extends HttpServlet {

	private static final long serialVersionUID = -8281845659081613239L;

	public void init() throws ServletException {
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		 response.setContentType("image/jpeg");  
	        // 禁止图像缓存。  
	        response.setHeader("Pragma", "no-cache");  
	        response.setHeader("Cache-Control", "no-cache");  
	        response.setDateHeader("Expires", 0);  
	        AutoCode instance = new AutoCode();  
	        Cookie cookie = new Cookie("authCode", instance.getCode());  
	        cookie.setMaxAge(1800);  
	        response.addCookie(cookie);  
	        instance.write(response.getOutputStream());  
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	public void destroy() {
	}

}
