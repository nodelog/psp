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
				<div class="panel-heading">${categoryName }下载列表</div>
				<table class="table table-hover" >
					 <s:if test="#request.downloadList==null||#request.downloadList.size()==0">
					 <thead><tr class="active"><th>暂无数据</th></tr></thead>
					</s:if>
					<s:else>
					 <thead><tr class="active"><th>序号</th><th>名称</th><th>大小</th><th>上传者</th><th>上传时间</th><th>评分</th><th>操作</th></tr></thead>
					</s:else>
					 <tbody id="downloadList">
					 <s:iterator value="#request.downloadList"  var="item" status="media"> 
					 <s:if test="#item.status==1">
						<tr class="active">
						<td><span class="number">${media.count }</span></td>
						<td title="${item.name }">
						 <s:if test="#item.name.length()>20">
							<s:property value='#item.name.substring(0,20)'/>...
						 </s:if>   
						 <s:else>      
								 ${item.name }
						 </s:else>
						</td>
						<td>${item.size }</td>
						<td>${item.user.name }</td>
						<td><fmt:formatDate value="${item.uploadTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" /></td>
						<td>${item.grade }分</td>
						<td><a href="javascript:void(0)" class="btn btn-default download" role="button" data-url="${item.url }"><span class="glyphicon glyphicon-cloud-download"></span>&nbsp;下载</a></td>
						</tr>
						</s:if>
					 </s:iterator>
					 </tbody>
			  	</table>
		</div>
	</body>
</html>