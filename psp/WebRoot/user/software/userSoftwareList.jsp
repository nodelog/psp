<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<meta name="author"content="Zero_and_Null,wangyachao0991@sina.cn">  
		<link rel="Shortcut icon" href="favicon.ico" />
	</head>
 
	<body>
    	<div class="panel panel-success">
				<div class="panel-heading">${title }</div>
					 <s:if test="#request.softwareList==null||#request.softwareList.size()==0">
					  <div class="panel-body">
					    	暂无数据
					  </div>
					</s:if>
					<s:else>
						<div class="panel-body">
					    	 <s:iterator value="#request.softwareList"  var="item" status="software">
								<s:if test="#item.status==1">
									<blockquote>
									<s:if test="#item.bgImage!=null">
									 <img src="${fileServer }${item.bgImage.url}" class="min-image"/>
									</s:if>
									  <p class="software-title"><a class="software-detail" data-id="${item.id }" >${item.name }</a></p>
									  <button type="button" class="btn btn-default pull-right download"  data-id="${item.id }" data-type="${categoryId }" data-url="${item.url }"><i class="glyphicon glyphicon-cloud-download"></i>&nbsp;下载</button>
									  <div class="clear"></div>
									  <small title="${item.introduction }">
									   <s:if test="#item.introduction.length()>200">
										<s:property value='#item.introduction.substring(0,200)'/>...
									   </s:if>
									   <s:elseif test="#item.introduction!=null&&#item.introduction.length()!=0"><p class="introduction">${item.introduction }</p></s:elseif> 
									   <s:else>暂无软件简介</s:else> 
									  </small>
									  <small>
									  	<cite title="Source Title">分类：${item.category.name }</cite>
									  	<cite title="Source Title">大小：${item.size }</cite>
									  	<cite title="Source Title">上传时间：
									  	<fmt:formatDate value="${item.uploadTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" />
									  	</cite>
									  	<cite title="Source Title">评分：${item.grade }分</cite>
									  </small>
									</blockquote> 
								</s:if>
								<s:if test="#item.status==2">
									<blockquote>
									  <p class="software-title">${item.name }（链接分享）</p>
									  <button type="button" class="btn btn-default pull-right open-link"  data-id="${item.id }" data-type="${categoryId }" data-url="${item.url }"><i class="glyphicon glyphicon-new-window"></i>&nbsp;打开链接</button>
									  <div class="clear"></div>
									  <small title="${item.introduction }">
									   <s:if test="#item.introduction.length()>200">
										<s:property value='#item.introduction.substring(0,200)'/>...
									   </s:if>
									   <s:elseif test="#item.introduction!=null&&#item.introduction.length()!=0"><p class="introduction">${item.introduction }</p></s:elseif> 
									   <s:else>暂无链接描述</s:else> 
									  </small>
									  <small>
									  	<cite title="Source Title">分类：${item.category.name }</cite>
									  	<cite title="Source Title">分享时间：
									  	<fmt:formatDate value="${item.uploadTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" />
									  	</cite>
									  </small>
									</blockquote> 
								</s:if>
					    	 	
					    	 </s:iterator>
					    </div>
					</s:else>
		</div>
	</body>
</html>