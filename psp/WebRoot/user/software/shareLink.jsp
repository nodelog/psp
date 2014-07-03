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
	</head>
 
	<body>
    	<div class="panel panel-success">
				  <div class="panel-heading">分享链接</div>
				  <div class="panel-body">
				      <form role="form">
						  <div class="form-group">
						    <label>链接名称</label>
						    <input type="text" class="form-control" id="linkName" maxlength="32" name="name" placeholder="必填">
						    <span>您还可以输入<span class="number">32</span>个字</span>
						  </div>
						  <div class="form-group">
						    <label>链接地址</label>
						    <input type="text" class="form-control" id="linkUrl" maxlength="500" name="url" placeholder="必填">
						    <span>您还可以输入<span class="number">500</span>个字</span>
						  </div>
						  <div class="form-group">
						    <label>链接描述</label>
						    <textarea class="form-control" rows="3" id="linkDesc" maxlength="1000"></textarea>
						    <span>您还可以输入<span class="number">1000</span>个字</span>
						  </div>
						  <div class="form-group">
						    <label>选择分类</label>
							<select class="softwareCategory form-control"  id="linkCategory">
			    				 <s:iterator value="#request.categoryList" var="item" status="software">
				    				<option value="${item.id }">${item.name }</option>
							  	 </s:iterator>	
			    			</select>
						  </div>
						  <button type="button" id="shareLink" class="btn btn-success">分享链接</button>
						</form>
				  </div>
			</div>
	</body>
</html>