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
				<div class="panel-heading">我的下载历史记录</div>
				<table class="table table-hover" >
					 <s:if test="#request.downloadList==null||#request.downloadList.size()==0">
					 <thead><tr class="active"><th>暂无数据</th></tr></thead>
					</s:if>
					<s:else>
					 <thead><tr class="active"><th>序号</th><th>名称</th><th>资源类别</th><th>下载时间</th><th>操作</th></tr></thead>
					</s:else>
					 <tbody id="downloadList">
					 <s:iterator value="#request.downloadList"  var="item" status="media"> 
						<tr class="active">
						<td><span class="number">${media.count }</span></td>
						<td title="${item.resourceName }">
								 ${item.resourceName }
						</td>
						<td>${item.typeName }</td>
						<td><fmt:formatDate value="${item.downloadTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" /></td>
						<td><a href="${ftpServer }${item.resourecUrl }" target="_blank" class="btn btn-default download" role="button" data-id="${item.resource }" data-type="${item.type }" data-url="${fileServer }${item.resourecUrl }"><span class="glyphicon glyphicon-cloud-download"></span>&nbsp;重新下载</a></td>
						</tr>
					 </s:iterator>
					 </tbody>
			  	</table>
		</div>
	</body>
</html>