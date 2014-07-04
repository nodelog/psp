<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html>
<html lang="en"><head>
	<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
    <meta charset="utf-8">
    <title>郑大公益后台管理</title>
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
  	<!-- 头部 -->
  	<header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
	    <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
	      <ul class="nav navbar-nav">
	        <li>
	          	<a id="adminTitle">郑大公益平台后台管理</a>
	        </li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <li>
		        <a>
			        <button class="btn btn-info btn-wide" id="adminExit">
						  退出
					</button>
		        </a>
	        </li>
	      </ul>
	    </nav>
	</header><!-- /header -->
	<div class="row">
		<!-- 导航列表 -->
		<div id="leftColumn" class="col-md-3 list-group">
			<div class="" id="leftNav">
			  <div class="panel panel-primary">
			  	<div class="panel-heading">
			  	<a href="#userNav" data-toggle="collapse" data-parent="#leftNav" class="list-group-item active">
			  		用户管理<i class="glyphicon glyphicon-chevron-down pull-right"></i>
			  	</a>
			    </div>
			    <div id="userNav" class="panel-collapse collapse in">
			      <div class="panel-body">
			      <a href="javascript:void(0)" class="list-group-item" >用户信息列表</a>
			      </div>
			    </div>
			  </div><!-- /panel -->
			  <div class="panel panel-primary">
			  	<div class="panel-heading">
			  	<a href="#categoryNav" data-toggle="collapse" data-parent="#leftNav" class="list-group-item active">
			  		分类管理<i class="glyphicon glyphicon-chevron-down pull-right"></i>
			  	</a>
			    </div>
			    <div id="categoryNav" class="panel-collapse collapse">
			      <div class="panel-body">
			      <a href="javascript:void(0)" class="list-group-item" >分类列表</a>
			      </div>
			    </div>
			  </div><!-- /panel -->
			  <div class="panel panel-primary">
			  	<div class="panel-heading">
			  	<a href="#scoreNav" data-toggle="collapse" data-parent="#leftNav" class="list-group-item active">
			  		积分管理<i class="glyphicon glyphicon-chevron-down pull-right"></i>
			  	</a>
			    </div>
			    <div id="scoreNav" class="panel-collapse collapse">
			      <div class="panel-body">
			      <a href="javascript:void(0)" class="list-group-item" >积分规则列表</a>
			      <a href="javascript:void(0)" class="list-group-item" >修改积分规则</a>
			      </div>
			    </div>
			  </div><!-- /panel -->
			  <div class="panel panel-primary">
			  	<div class="panel-heading">
			  	<a href="#problemNav" data-toggle="collapse" data-parent="#leftNav" class="list-group-item active">
			  		问答管理<i class="glyphicon glyphicon-chevron-down pull-right"></i>
			  	</a>
			    </div>
			    <div id="problemNav" class="panel-collapse collapse">
			      <div class="panel-body">
			      <a href="javascript:void(0)" class="list-group-item" >问题列表</a>
			      </div>
			    </div>
			  </div><!-- /panel -->
			  <div class="panel panel-primary">
			  	<div class="panel-heading">
			  	<a href="#skillNav" data-toggle="collapse" data-parent="#leftNav" class="list-group-item active">
			  		技术管理<i class="glyphicon glyphicon-chevron-down pull-right"></i>
			  	</a>
			    </div>
			    <div id="skillNav" class="panel-collapse collapse">
			      <div class="panel-body">
			      <a href="javascript:void(0)" class="list-group-item" >技术列表</a>
			      </div>
			    </div>
			  </div><!-- /panel -->
			  <div class="panel panel-primary">
			  	<div class="panel-heading">
			  	<a href="#documentNav" data-toggle="collapse" data-parent="#leftNav" class="list-group-item active">
			  		文档管理<i class="glyphicon glyphicon-chevron-down pull-right"></i>
			  	</a>
			    </div>
			    <div id="documentNav" class="panel-collapse collapse">
			      <div class="panel-body">
			      <a href="javascript:void(0)" class="list-group-item" >文档列表</a>
			      </div>
			    </div>
			  </div><!-- /panel -->
			  <div class="panel panel-primary">
			  	<div class="panel-heading">
			  	<a href="#softwareNav" data-toggle="collapse" data-parent="#leftNav" class="list-group-item active">
			  		软件管理<i class="glyphicon glyphicon-chevron-down pull-right"></i>
			  	</a>
			    </div>
			    <div id="softwareNav" class="panel-collapse collapse">
			      <div class="panel-body">
			      <a href="javascript:void(0)" class="list-group-item" >软件列表</a>
			      </div>
			    </div>
			  </div><!-- /panel -->
			  <div class="panel panel-primary">
			  	<div class="panel-heading">
			  	<a href="#mediaNav" data-toggle="collapse" data-parent="#leftNav" class="list-group-item active">
			  		多媒体管理<i class="glyphicon glyphicon-chevron-down pull-right"></i>
			  	</a>
			    </div>
			    <div id="mediaNav" class="panel-collapse collapse">
			      <div class="panel-body">
			      <a href="javascript:void(0)" class="list-group-item" >多媒体列表</a>
			      </div>
			    </div>
			  </div><!-- /panel -->
			</div>
		</div>
		<!-- 内容列表 -->
		<div  id="rightColumn" class="col-md-9">
		</div>
	</div>
	<jsp:include page="../foot.html"></jsp:include>	
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
    <script src="admin/js/jquery.stacktable.js"></script>
    <%--<script src="http://vjs.zencdn.net/4.3/video.js"></script>
    --%><script src="admin/js/application.js"></script>
     <script type="text/javascript" src="js/jquery.cookie.js"></script>
	<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="admin/js/admin.js"></script>
	</body>
</html>