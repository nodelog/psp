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
    	<table class="table table-hover table-striped">
    		 <s:if test="#request.messageList==null||#request.messageList.size()==0">
	    		 <tr>
		    		 <td>暂无消息 </td>
	    		 <tr>
    		 </s:if>
    		 <s:iterator value="#request.messageList"  var="item" status="message">
	    		 <tr>
		    		 <td width="150px"><fmt:formatDate value="${item.sendTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" /></td>
		    		 <td align="left" title="查看消息内容">
		    		 <s:if test="#item.status==1"><i class="glyphicon glyphicon-envelope"></i></s:if>
		    		 <s:else><i>(已读)</i></s:else>
		    		 <a data-id="${item.id }" class="message-detail">${item.title }</a>
		    		 </td>
		    		 <td align="right"><a data-id="${item.id }" class="delete-message">X</a></td>
	    		 </tr>
    		 </s:iterator>
    	</table>
	</body>
</html>