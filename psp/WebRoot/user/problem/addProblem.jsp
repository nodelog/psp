<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<title>我要提问？</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<meta name="author"content="Zero_and_Null,wangyachao0991@sina.cn">  
		<link rel="Shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/problem.css">
		<link rel="stylesheet" type="text/css" href="css/layer-1.8.1.css" />
		<link rel="stylesheet" type="text/css" href="css/uploadify.css" />
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
		<script type="text/javascript" src="js/jquery.uploadify.min.js"></script>
		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/index.js"></script>
		<script type="text/javascript" src="js/addProblem.js"></script>
		
	</head>
 
	<body>
    	<div id="addProblem">
    		<div class="qa_title">
    			<i class="qa_ico"></i>问题简述<i class="qa_count">您还可以输入<span class="number">32</span>个字</i>
    		</div>
    		<div class="qa_title_text">
    			<input type="text" maxlength="32" placeholder="请输入简短的问题描述" />
    		</div>
    		<div class="qa_detail">
    			问题详情
    		</div>
    		<div class="qa_detail_text">
    			<textarea ></textarea>
    		</div>
    		<div class="qa_upload">
    			<input id="file_upload" name="image" type="file" />
    			
    		</div>
    		<div class="qa_type">
    			<select class="qa_category" >
    				<option value="" disabled selected style="display: none;">请选择分类</option>
    			</select>
    			<select class="qa_score" title="">
    				<option value="0">0公益币</option>
    				<option value="5">5公益币</option>
    				<option value="10">10公益币</option>
    				<option value="15">15公益币</option>
    				<option value="20">20公益币</option>
    				<option value="30">30公益币</option>
    				<option value="50">50公益币</option>
    				<option value="80">80公益币</option>
    				<option value="100">100公益币</option>
    			</select>
    			<a href="javascript:void(0);" id="qa_submit" title="">提交问题</a>
    		</div>
    	</div>
	</body>
</html>