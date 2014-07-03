<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<title>用户登录 - 郑大公益</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<meta name="author"content="Zero_and_Null,wangyachao0991@sina.cn">  
		<link rel="Shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/foot.css">
		<link rel="stylesheet" type="text/css" href="css/login.css">
		<link rel="stylesheet" type="text/css" href="css/layer-1.8.1.css" />
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
		<script type="text/javascript" src="js/login.js"></script>
	</head>
 
	<body>
    	<div id="logo"></div>
    	<div id="login_panel">
    		<div class="panel_head"><h2>用户登录</h2></div>
    		<div class="panel_content">
    			<div class="name">
    				<input type="text" name="name" placeholder="用户名/邮箱" autofocus />
    			</div>
    			<div class="password">
    				<input type="password" name="password" placeholder="密码" />
    			</div>
    			<div class="option">
    				<input type="checkbox" id="autoLogin" checked="checked"/><label for="autoLogin">记住我一月</label>
    				<%--<a href="javascript:void(0)">忘记密码</a>
    			--%></div>
    			<div class="login">
					<a href="javascript:void(0)" id="login">登&nbsp;录</a>
    			</div>
    			<div class="register">
					<a href="register.jsp" id="register">注册新用户</a>
    			</div>
    		</div>
    	</div>
    	<jsp:include page="foot.html"></jsp:include>
	</body>
</html>