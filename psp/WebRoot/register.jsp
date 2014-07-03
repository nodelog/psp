<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "
http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta charset="UTF-8">
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<meta name="author"content="Zero_and_Null,wangyachao0991@sina.cn">  
		<link rel="Shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/register.css" />
		<link rel="stylesheet" type="text/css" href="css/foot.css" />
		<script src="js/jquery-1.10.2.js" type="text/javascript"></script>
		<script src="js/jquery.cookie.js" type="text/javascript"></script>
		<script src="js/common.js" type="text/javascript"></script>
		<script src="js/register.js" type="text/javascript"></script>
		<title>郑大公益 - 用户注册</title>
	</head>
	<body>
		<div class="head">
			<div class="logo" title="郑大公益首页"></div>
			<div class="login">
				<div class="title"><span>新用户注册</span></div>
				<div class="login-link">
					<span>已注册，请</span>
					<button class="login-btn" id="login_btn">登录</button>
				</div>
			</div>
		</div>
		<div class="slip"></div>
		<div id="step">
			<div><span id="step-number">1.</span><span id="step-text">填写用户信息</span></div>
			</div>
		<div class="regsiter">
			<div class="form">
				<form action="#" method="post" name="register">
					<div class="content">
						<div class="label">
							<label for="name">用户名</label>
						</div>
						<div class="text">
							<input type="text" class="input" name="name" id="name" maxlength="32"  autofocus placeholder="用户名"/>
							<span class="delete name"></span>
						</div>
						<div class="error"><span class="error-text"></span></div>
					</div>
					<div class="content">
						<div class="label">
							<label for="password">密码</label>
						</div>
						<div class="text">
							<input type="password" class="input" name="password" id="password" maxlength="32" placeholder="密码" />
							<span class="delete"></span>
						</div>
						<div class="error"><span class="error-text"></span></div>
					</div>
					<div class="content">
						<div class="label">
							<label for="password2">确认密码</label>
						</div>
						<div class="text password2">
							<input type="password" class="input" name="password2" id="password2" maxlength="32"  placeholder="再次输入密码"/>
							<span class="delete"></span>
						</div>
						<div class="error"><span class="error-text"></span></div>
					</div>
					<div class="content">
						<div class="label">
							<label for="email">邮箱</label>
						</div>
						<div class="text">
							<input type="text" class="input" name="email" id="liveEmail" maxlength="64" placeholder="激活邮箱"/>
							<span class="delete"></span>
						</div>
						<div class="error"><span class="error-text"></span></div>
					</div>
					<div class="content">
						<div class="label">
							<label for="authCode">验证码</label>
						</div>
						<div class="text authCode">
							<input type="text" class="input" name="authCode" size="11" maxlength="5" id="authCode" 
												placeholder="验证码"/>
							<span class="delete"></span>
						</div>
						<img src="authImg.servlet" class="authImg" title="看不清，点击更换" alt="验证码" />
						<div class="error"><span class="error-text"></span></div>
					</div>
					<div class="content step-one">
						<div class="label">&nbsp;</div>
						<div class="text submit">
						<input type="button" class="input"  accesskey="enter" value="下一步"/>
						</div>
					</div>				
	
	
				</form>
			</div>
			<div id="email">
				<div id="step-two">
					<div class="check-email">
						<div class="label">
							<label for="live-code">请输入激活码</label>
						</div>
						<div class="live-code-div">
							<input type="text" class="live-code" name="liveCode" id="live-code" maxlength="6"  autofocus placeholder="激活码" />
						</div>
						<div class="tip-email"><a href="javascript:void(0);" class="sendEmail">重发激活码</a>,我们向你绑定的邮箱：<span id="bindingEmail"></span>发送了激活码。</div>	
					</div>
					<div class="email-btn-div">
						<input type="button" class="live-code-btn" id="live-code-btn" value="下一步"/>
					</div>
				</div>
				<div id="confirm">
					<div><span>恭喜你已经注册成为郑大公益会员</span></div>
					<div><span>注册用户名为：<i class="reg_name"></i></span></div>
					<div><span>注册邮箱为：<i class="reg_email"></i></span></div>
					<div class="login-div"><input type="button" class="login-btn" id="login-btn" value="立即登录"/></div>
				</div>
			</div>
			<div class="weixin" title="微信扫一扫，关注郑大公益"></div>
		</div>
		<div class="slip"></div>
		<div class="foot" >
		<jsp:include page="foot.html" flush="true"></jsp:include>
		</div>
</body>
</html>



