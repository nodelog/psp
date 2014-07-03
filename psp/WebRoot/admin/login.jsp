<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html>
<html lang="en"><head>
	<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
    <meta charset="utf-8">
    <title>郑大公益后台管理 - 管理员登陆</title>
    <meta name="description" content="Flat UI Kit Free is a Twitter Bootstrap Framework design and Theme, this responsive framework includes a PSD and HTML version.">
    <meta name="viewport" content="width=1000, initial-scale=1.0, maximum-scale=1.0">
    <!-- Loading Bootstrap -->
    <link href="admin/bootstrap/css/bootstrap.css" rel="stylesheet">
    <!-- Loading Flat UI -->
    <link href="admin/css/flat-ui.css" rel="stylesheet">
    <link href="admin/css/demo.css" rel="stylesheet">
    <link href="admin/css/admin.css" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
    <!--[if lt IE 9]>
      <script src="admin/js/html5shiv.js"></script>
      <script src="admin/js/respond.min.js"></script>
    <![endif]-->
  </head>
  <body data-twttr-rendered="true">
    <div class="container">
      <div class="login">
        <div class="login-screen">
          <div class="login-icon">
            <img src="admin/images/login/logo.jpg" alt="Welcome to Mail App">
            <h4>郑大公益 <small>后台登录</small></h4>
          </div>
          <div class="login-form">
            <div class="form-group">
              <input type="text" class="form-control login-field" value="" placeholder="管理员账号" id="login-name" autofocus>
              <label class="login-field-icon fui-user" for="login-name"></label>
            </div>

            <div class="form-group">
              <input type="password" class="form-control login-field" value="" placeholder="密码" id="login-pass">
              <label class="login-field-icon fui-lock" for="login-pass"></label>
            </div>

            <a class="btn btn-info btn-lg btn-block" href="javascript:void(0)" id="adminLoginBtn">登录</a>
          </div>
        </div>
      </div>
    </div> <!-- /container -->
    <!-- Load JS here for greater good =============================-->
    <script src="admin/js/jquery-1.8.3.min.js"></script>
    <script src="admin/js/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="admin/js/jquery.ui.touch-punch.min.js"></script>
    <script src="admin/js/bootstrap.min.js"></script>
    <script src="admin/js/bootstrap-select.js"></script>
    <script src="admin/js/bootstrap-switch.js"></script>
    <script src="admin/js/flatui-checkbox.js"></script>
    <script src="admin/js/flatui-radio.js"></script>
    <script src="admin/js/jquery.tagsinput.js"></script>
    <script src="admin/js/jquery.placeholder.js"></script>
    <%--<script src="http://vjs.zencdn.net/4.3/video.js"></script>
    --%><script src="admin/js/application.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
	<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="admin/js/admin.js"></script>
	<script type="text/javascript">
	//绑定回车
    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            $('#adminLoginBtn').click();
        }
    }
	</script>
	</body>
</html>