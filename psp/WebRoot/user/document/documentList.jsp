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
    	<div class="panel panel-default">
		  <div class="panel-heading">
		  	<div class="btn-group">
		  		<select class="form-control" id="categorySelect">
				  <option data-type="all" data-total="${pageTotal }" value="">全部</option>
				  <s:iterator value="#request.categoryList" var="item" status="category">
				  <s:if test="#item.id==#request.categoryId">
				    	<option value="${item.id }" selected data-type="category" data-total="${item.pageTotal }">${item.name }</option>
				  </s:if>
				  <s:else>
				    	<option value="${item.id }" data-type="category" data-total="${item.pageTotal }">${item.name }</option>
				  </s:else>
				  </s:iterator>	
				</select>
			</div>
		  </div>
		  <div class="panel-body">
		    <s:if test="#request.documentList==null||#request.documentList.size()==0"><p>暂无数据</p></s:if>
		    <div class="row">
		     <s:iterator value="#request.documentList" var="item" status="document">
			  <div class="col-sm-11 col-md-11">
			    <div class="thumbnail">
			      <div class="caption">
			        <h3><a class="document-title" data-id="${item.id }" data-url="${item.url }">${item.name }</a>
			        <a href="${ftpServer }${item.url }" target="_blank" class="btn btn-default download pull-right document-download" role="button" data-url="${fileServer }${item.url }" data-id="${item.id }" data-type="${item.category.id }"><span class="glyphicon glyphicon-cloud-download"></span>&nbsp;下载</a>
			        </h3>
			        <small>
						<cite >分类：${item.category.name }</cite>
						<cite>上传时间：
						<fmt:formatDate value="${item.uploadTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" />
						</cite>
						<cite>上传者：${item.user.name }</cite>
						<cite>大小：${item.size }</cite>
						<cite>浏览量：${item.viewCount } 人浏览</cite>
					</small>
			      </div>
			    </div>
			  </div>
			 </s:iterator>
			</div>
		  </div>
		</div>
	</body>
</html>