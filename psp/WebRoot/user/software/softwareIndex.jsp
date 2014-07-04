<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE HTML>
<html>
<head>
<base
	href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta name="author" content="Zero_and_Null,wangyachao0991@sina.cn">
<link rel="Shortcut icon" href="favicon.ico" />
<link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="css/software.css" />
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/software.js"></script>

</head>

<body>
<div id="software">
	<div class="row">
		<!-- 分类列表 -->
		<div id="leftColumn">
			<div class="list-group">
			  <a href="#softwareResource" data-toggle="collapse" class="list-group-item active-title">软件分类浏览<i class="glyphicon glyphicon-chevron-down pull-right"></i></a>
			  <div class="list-group" id="softwareResource">
				 <s:iterator value="#request.categoryList"  var="item" status="software">
					  	<a href="javascript:void(0)" class="list-group-item" data-type="" data-id="${item.id }" data-total="${item.pageTotal }">${item.name }<span class="badge pull-right">${item.pageTotal }</span></a>
			  	 </s:iterator>	
			  </div>
			</div>
			<div class="list-group">
			  <a href="#mySoftware" data-toggle="collapse" class="list-group-item active-title">我的软件<i class="glyphicon glyphicon-chevron-down pull-right"></i></a>
			  <div class="list-group" id="mySoftware">
				  	<a href="javascript:void(0)" class="list-group-item" data-id="" data-type="1" data-total="${myUploadCount }">我的上传<span class="badge pull-right">${myUploadCount }</span></a>
				  	<a href="javascript:void(0)" class="list-group-item" data-id="" data-type="2" data-total="${myLinkCount }">我的链接<span class="badge pull-right">${myLinkCount }</span></a>
			  </div>
			</div>
			<div class="list-group">
			  <a href="#shareSoftware" data-toggle="collapse" class="list-group-item active-title">分享软件<i class="glyphicon glyphicon-chevron-down pull-right"></i></a>
			  <div class="list-group" id="shareSoftware">
				  	<a href="javascript:void(0)" class="list-group-item upload-software" >上传软件&nbsp;<span class="badge"></a>
				  	<a href="javascript:void(0)" class="list-group-item share-link" >分享链接</a>
			  </div>
			</div>
		</div>
		<!-- 内容列表 -->
		<div  id="rightColumn">
			<s:if test="#request.fileList!=null&&#request.fileList.size()!=0">
			<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
			  <!-- Indicators -->
			  <ol class="carousel-indicators">
			   <s:iterator value="#request.fileList"  var="item" status="image">
			      <s:if test="#image.count==1">
			    <li data-target="#carousel-example-generic" data-slide-to="${image.index }" class="active"></li>
				  </s:if>
				  <s:else>
			    <li data-target="#carousel-example-generic" data-slide-to="${image.index }"></li>
				  </s:else>
			   </s:iterator>
			  </ol>
			
			  <!-- Wrapper for slides -->
			  <div class="carousel-inner">
			  <s:iterator value="#request.fileList"  var="item" status="image">
			  <s:if test="#image.count==1">
			    <div class="item active">
			  </s:if>
			  <s:else>
			    <div class="item">
			  </s:else>
			      <img src="${fileServer }${item.url}" class="software-detail" data-id="${item.appId }" style="height: 300px;width:700px;cursor: pointer;" title="点击查看详情"/>
				  <div class="carousel-caption">
				    <h3>${item.name }</h3>
				  </div>
			    </div>
			  </s:iterator>
			  </div>
			
			  <!-- Controls -->
			  <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
			    <span class="glyphicon glyphicon-chevron-left"></span>
			  </a>
			  <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
			    <span class="glyphicon glyphicon-chevron-right"></span>
			  </a>
			</s:if>
			</div>
		</div>
		
		<div id="paging"></div>
		<div class="clear"></div>
	</div>
	<div id="upload-div">
			<div class="panel panel-success">
				  <div class="panel-heading">上传软件</div>
				  <div class="panel-body">
				      <form role="form">
						  <div class="form-group">
						    <label for="softwareImage">添加软件截图</label>
						    <input type="file" id="softwareImage" name="softwareImage">
						  </div>
						  <div class="form-group">
						    <label for="softwareFile">选择文件</label>
						    <input type="file" id="softwareFile" name="softwareFile">
						    <ol id="successList" class="successList">
						    </ol>
						  </div>
						  <div class="form-group">
						    <label for="softwareName">软件名称</label>
						    <input type="text" class="form-control" id="softwareName" maxlength="32" name="name" placeholder="默认使用上传的软件的名称" title="修改自己喜欢的名称">
						    <span>您还可以输入<span class="number">32</span>个字</span>
						  </div>
						   <div class="form-group">
						    <label for="introduction">软件简介</label>
						    <textarea class="form-control" id="introduction" rows="3" maxlength="1000"></textarea>
						    <span>您还可以输入<span class="number">1000</span>个字</span>
						  </div>
						   <div class="form-group">
						    <label for="softwareName">选择分类</label>
							<select  id="softwareCategory" class="form-control">
								<s:iterator value="#request.categoryList"  var="item" status="software">
				    				<option value="${item.id }">${item.name }</option>
							  	 </s:iterator>	
			    			</select>
						  </div>
						  <div class="checkbox">
						    <label>
						      <input type="checkbox" id="softwareProtocol" checked="checked">同意上传协议，上传的软件仅限用于学习与研究之目的，没有任何商业用途。
						    </label>
						  </div>
						  <button type="button" id="uploadFile" class="btn btn-success">上传软件</button>
						</form>
				  </div>
				  <div class="panel-footer">折叠上传面板可以后台上传</div>
			</div>
		</div>
</div>	
</body>
</html>