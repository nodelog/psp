<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
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
		<link rel="stylesheet" href="css/buttons.css">
		<link rel="stylesheet" href="css/index.css">
		<link rel="stylesheet" href="css/document.css">
		<link rel="stylesheet" type="text/css" href="css/uploadify.css" />
		<link rel="stylesheet" type="text/css" href="css/layer-1.8.1.css" />
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
		<script type="text/javascript" src="js/jquery.uploadify.min.js"></script>
		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/document.js"></script>
	</head>
 
	<body>
    	<div class="panel panel-success" id="addDocumentDiv">
				  <div class="panel-body">
				      <form role="form">
						  <div class="form-group">
						    <label for="documentFile">选择文件</label>
						    <input type="file" id="documentFile" name="documentFile">
						    <ol id="successList" class="successList">
						    </ol>
						  </div>
						  <div class="form-group">
						    <label for="documentName">文档名称</label>
						    <input type="text" class="form-control" id="documentName" maxlength="32" name="name" placeholder="默认使用上传的文档的名称" title="修改自己喜欢的名称">
						    <span>您还可以输入<span class="number">32</span>个字</span>
						  </div>
						   <div class="form-group">
						    <label>选择分类</label>
							<select  id="documentCategory" class="form-control">
								<s:iterator value="#request.categoryList"  var="item" status="document">
				    				<option value="${item.id }">${item.name }</option>
							  	 </s:iterator>	
			    			</select>
						  </div>
						  <div class="checkbox">
						    <label>
						      <input type="checkbox" id="protocol" checked="checked">同意上传协议，上传的文档仅限用于学习与研究之目的，没有任何商业用途。
						    </label>
						  </div>
						  <button type="button" id="uploadFile" class="btn btn-success">上传文档</button>
						</form>
				  </div>
			</div>
	</body>
</html>