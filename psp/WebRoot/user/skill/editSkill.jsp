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
		<link rel="stylesheet" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="css/buttons.css">
		<link rel="stylesheet" href="css/index.css">
		<link rel="stylesheet" href="css/skill.css">
		<link rel="stylesheet" type="text/css" href="css/layer-1.8.1.css" />
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/skill.js"></script>
	</head>
 
	<body>
    	<!-- 发布技术 -->
		<div id="releaseSkill">
			<div class="panel panel-default">
			  <div class="panel-body">
			    <div class="form-group">
					<label>标题</label>
					<input type="text" value="${skill.title }" class="form-control" id="editTitle" maxlength="32" name="title" placeholder="必填">
					<span>您还可以输入<span class="number" id="number">${32-skill.title.length() }</span>个字</span>
				</div>
			    <div class="form-group">
					<label>内容</label>
					<!-- 编辑器 -->
					<div style="display: none;" id="skillContent">${skill.content }</div>
				    	<jsp:include page="../common/editor.jsp" flush="true"></jsp:include>
				</div>
				 <div class="form-group">
					<label>选择分类</label>
					<select class="softwareCategory form-control"  id="editCategory">
			    		<s:iterator value="#request.categoryList" var="item" status="skill">
			    			<s:if test="#request.skill.category.id==#item.id">
				    		<option value="${item.id }" selected>${item.name }</option>
			    			</s:if>
			    			<s:else>
				    		<option value="${item.id }">${item.name }</option>
			    			</s:else>
						</s:iterator>	
			    	</select>
				</div>
				<input type="hidden" value="${skill.id }" id="editId">
				<span class="button-wrap" id="editBtn"><a href="javascript:void(0)" class="button button-pill button-action">保存编辑</a></span>
			  </div>
			</div>
		</div>
	</body>
	<script type="text/javascript">
		var _html = $('#skillContent').html();
		$('#editor').html(_html);
	</script>
</html>