package com.psp.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 类名称：JspFilter 类描述：JspFilter 创建人：王亚超 创建时间：2014-3-14 下午6:38:15
 * 
 * @version 1.0
 */
public class JspFilter implements Filter {
	private String target;
	public void destroy() {
		// TODO Auto-generated method stub

	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		//转化对象
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		//请求的完整url路径
		StringBuffer requestURL = httpRequest.getRequestURL();
		//上下文名字，应用名称
		StringBuffer path = new StringBuffer(httpRequest.getContextPath());
		path.append("/");
		//组合jsp实际路径
		StringBuffer url = new StringBuffer();
		url.append(requestURL.substring(requestURL.indexOf(path.toString())
				+ path.length()));
		//重定向到目标的action
		path.append(target);
		path.append("?url=/");
		path.append(url.toString());
		httpResponse.sendRedirect(path.toString());
	}

	public void init(FilterConfig filterConfig) throws ServletException {
		target = filterConfig.getInitParameter("target");
	}

}
