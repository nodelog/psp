<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
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
		  	我的技术
		  </div>
		  <div class="panel-body">
		 	<s:if test="#request.skillList==null||#request.skillList.size()==0"><p>暂无数据</p></s:if>
		    <div class="row">
		     <s:iterator value="#request.skillList" var="item" status="skill">
			   <div class="col-sm-11 col-md-11">
			    <div class="thumbnail">
			      <div class="caption">
			        <h3><a class="skill-title" data-id="${item.id }">${item.title }</a></h3>
			        <small>
						<cite title="Source Title">分类：${item.category.name }</cite>
						<cite title="Source Title">发布时间：
						<fmt:formatDate value="${item.createTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" />
						</cite>
						<cite title="Source Title">平均评分：${item.grade }分</cite>
					</small>
			        <div class="skill-content">${item.content }</div>
			      </div>
			    </div>
			  </div>
			 </s:iterator>
			</div>
		  </div>
		</div>
	</body>
</html>