<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<title>郑大公益平台</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<meta name="author" content="Zero_and_Null,wangyachao0991@sina.cn">  
		<link rel="Shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/index.css" />
		<link rel="stylesheet" type="text/css" href="css/head.css">
		<link rel="stylesheet" type="text/css" href="css/foot.css">
		<link rel="stylesheet" type="text/css" href="css/menu.css" />
		<link rel="stylesheet" type="text/css" href="css/loading.css" />
		<link rel="stylesheet" type="text/css" href="css/layer-1.8.1.css" />
		<link rel="stylesheet" type="text/css" href="css/uploadify.css" />
		<link rel="stylesheet" type="text/css" href="css/jqpagination.css" />
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/ajaxfileupload.js"></script>
		<script type="text/javascript" src="js/jquery.jqpagination.js"></script>
		<script type="text/javascript" src="js/jquery.plugins.js"></script>
		<script type="text/javascript" src="js/jquery.uploadify.min.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<script type="text/javascript" src="js/gotoTop.js"></script>
		<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/menu.js"></script>
		<script type="text/javascript" src="js/head.js"></script>
		<script type="text/javascript" src="js/index.js"></script>
		
	</head>
	<body>
	<%--页面头部（logo）--%>
    <jsp:include page="user/common/head.jsp"></jsp:include>
	<%--熔岩灯菜单导航--%>
    <jsp:include page="user/common/menu.html"></jsp:include>
    
	<%--页面内容--%>
    <div id="content" class="content"></div>
	<%--返回顶部--%>
	<div id="circle"></div>
    <div id="circle1"></div>
    <script type="text/javascript">
    $(window).load(function(){
        $("#circle").fadeOut(500);
        $("#circle1").fadeOut(700);
    });
    </script>
    <jsp:include page="foot.html"></jsp:include>
	</body>
</html>