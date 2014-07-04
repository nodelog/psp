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
			${message.title }
			<i class="pull-right"><fmt:formatDate value="${message.sendTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" /></i>
		</div>
		<div class="panel-body">
		 	内容：${message.content }
		</div>
	</div>

	</body>
</html>