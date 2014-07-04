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
		<link rel="stylesheet" href="css/bootstrap.css" />
		<link rel="stylesheet" href="css/buttons.css" />
		<link rel="stylesheet" href="css/person.css">
		<link rel="stylesheet" href="css/bootstrap-switch.min.css" />
		<script type="text/javascript" src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/bootstrap-switch.min.js"></script>
		<script type="text/javascript" src="js/person.js"></script>
	</head>
 
	<body>
		<!-- 导航 -->
    	<ul class="nav nav-tabs nav-justified" id="myTab">
		  <li  class="active"><a href="#home" data-toggle="tab">个人中心</a></li>
		  <li><a href="#profile" data-toggle="tab" id="messageTab">消息中心<span class="badge pull-right"></span></a></li>
		  <li><a href="#settings" data-toggle="tab">账号设置</a></li>
		</ul>
		<!-- 内容 -->
		<div class="tab-content" id="myContent">
			<div class="tab-pane fade in active active" id="home">
		  		<!-- 头像 -->
		 		<div class="row">
					<div class="col-sm-2 col-md-3">
						<div class="thumbnail">
							<img src="${user.head}" id="myHeadImage" alt="头像" class="img-circle" style="width: 160px;height: 160px;" >
							<div class="caption">
							<input type="file" name="userHead" hidefocus id="headImage"/>
							<a href="javascript:void(0)" id="editHead" class="button glow button-rounded button-flat-action"><i class="glyphicon glyphicon-camera"></i>&nbsp;修改头像</a>
					        </div>
					    </div>
				    </div>
				    <div class="col-sm-7 col-md-7">
						  <table class="table table-hover table-bordered">
						  <tr>
							  <td width="100px">用户名</td>
							  <td>${user.name }</td>
						  </tr>
						  <tr>
							  <td>性别</td>
							  <td>
							  <s:if test="#session.user.sex==1">
							  	帅哥
							  </s:if>
							  <s:else>美女</s:else>
							  </td>
						  </tr>
						  <tr>
							  <td>绑定邮箱</td>
							  <td>${user.email }</td>
						  </tr>
						  <tr>
							  <td>公益币</td>
							  <td>${user.level.scoreNumber }</td>
						  </tr>
						  <tr>
							  <td>等级</td>
							  <td>${user.level.levelRule.levelNumber }级</td>
						  </tr>
						  <tr>
							  <td>注册时间</td>
							  <td>
							  <fmt:formatDate value="${user.registerTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" />
							 </td>
						  </tr>
				          </table>
				    </div>
				</div>
		  </div>
		  <div class="tab-pane fade" id="profile">
		  	<div id="messageList">
		  	</div>
		  	<script type="text/javascript">
		  		$('#messageList').load("user/message.listPaging.action?currentPage=1");
		  	</script>
		  	<div id="pageScript">
  				<jsp:include page="../common/paging.jsp" flush="true"></jsp:include>
  			</div>	
  			<script type="text/javascript">
  				$(function(){
  					$.post("json/message.getPageTotal.action",function(data){
  			            var _count = data.pageTotal;
  			            $('.pagination').jqPagination({
  			                link_string: '/?page={page_number}',
  			                current_page: _count == 0 ? 0 : 1,
  			                max_page: _count,
  			                paged: function(page){
  			                	$('#messageList').load("user/message.listPaging.action?currentPage="+page);
  			                    document.getElementById('messageList').scrollIntoView(true);
  			                }
  			            });
  			        }, "json");
  				});
  			</script>
		  </div>
		  <!--  账号安全-->
		  <div class="tab-pane fade" id="settings">
		  <ul class="nav nav-pills nav-justified">
			  <li class="active"><a data-toggle="tab" href="#baseSeting">基本信息设置</a></li>
			  <li><a data-toggle="tab" href="#passwdSetting">登录密码设置</a></li>
			  <li><a data-toggle="tab" href="#emailSetting">邮箱登录设置</a></li>
		 </ul>
		 <div class="tab-content">
		 <div class="tab-pane fade in active active" id="baseSeting">
			<!-- 基本信息设置 -->
			<div class="panel panel-success">
					  <div class="panel-body">
					      <form role="form">
							  <div class="form-group">
							    <label for="userName">用户名</label>
							    <input type="text" class="form-control" id="userName" value="${user.name }" maxlength="32" name="name" placeholder="必填">
							    <span>您还可以输入<span class="number">${32-user.name.length() }</span>个字</span>
							  </div>
							  <div class="form-group" id="sexDiv">
							    <label>性别</label>
							    <input type="radio"  value="1" name="sex" id="male"/> <label for="male">帅哥</label>
							    <input type="radio" value="2" name="sex" id="female"/> <label for="female">美女</label>
							    <script type="text/javascript">
							    $("#sexDiv input[type=radio]").each(function(){
							        if($(this).val()==${user.sex}){
							        	$(this).prop("checked",true);
							        }
							      });
							    </script>
							  </div>
							  <div class="form-group">
							    <label for="userEmail">邮箱</label>
							    <input type="email" class="form-control" value="${user.email }" id="userEmail" maxlength="64" name="email" placeholder="必填">
							    <span>您还可以输入<span class="number">${64-user.email.length() }</span>个字</span>
							  </div>
							  <button type="button" id="saveBaseInfo" class="btn btn-success">保存修改</button>
							</form>
					  </div>
				</div>
			</div>
			<!-- 密码修改 -->
			<div class="tab-pane fade" id="passwdSetting">
			<div class="panel panel-success">
					  <div class="panel-body">
					      <form role="form">
							  <div class="form-group">
							    <label>旧密码</label>
							    <input type="password" class="form-control" id="oldPassword" maxlength="32" placeholder="必填">
							    <span>您还可以输入<span class="number">32</span>个字</span>
							  </div>
							  <div class="form-group">
							    <label>新密码</label>
							    <input type="password" class="form-control" id="newPassword" maxlength="32" placeholder="必填">
							    <span>您还可以输入<span class="number">32</span>个字</span>
							  </div>
							  <div class="form-group">
							    <label>确认密码</label>
							    <input type="password" class="form-control" id="surePassword" maxlength="32" placeholder="必填">
							    <span>您还可以输入<span class="number">32</span>个字</span>
							  </div>
							  
							  <button type="button" id="savePassword" class="btn btn-success">保存修改</button>
							</form>
					  </div>
				</div>
			</div>
		 	<div class="tab-pane fade" id="emailSetting">
		 		<div class="panel panel-success">
					<div class="panel-body">
					<blockquote>
					<p>绑定邮箱：${user.email }</p>
					是否可登录：<input type="checkbox" id="emailLogin"/>
					</blockquote>
						<script type="text/javascript">
						if(${user.emailLogin}==true){
							$("#emailLogin").prop('checked','true');
						}
						$("#emailLogin").bootstrapSwitch({size:'large',onColor:'success',offColor:'danger',onText:'是',offText:'否'});
						</script>
					</div>  
				</div>
		 	</div>
		   </div>
		  </div>
		</div>
	</body>
</html>