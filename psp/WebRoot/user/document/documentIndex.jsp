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
		<link rel="stylesheet" href="css/document.css">
		<script type="text/javascript" src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/document.js"></script>
		
	</head>
 
	<body>
		<!-- 圆形按钮 -->
		<div id="documentBtn">
			<table style="width: 100%">
			<tr>
			<td align="right">
			<span class="button-wrap" id="typeView" data-type="all" data-total="${pageTotal }"><a href="javascript:void(0)" class="button button-circle">分类浏览</a></span>
			</td>
			<td align="center">
			<span class="button-wrap" id="myDocument" data-type="user" data-total="${myTotal }"><a href="javascript:void(0)" class="button button-circle">我的文档</a></span>
			</td>
			<td>
			<span class="button-wrap" id="uploadDocument"><a href="javascript:void(0)" class="button button-circle">上传文档</a></span>
			</td>
			</tr>
			</table>
		</div>
		
		<!-- 浏览内容 -->
		<div id="documentContent">
		</div>
		<script type="text/javascript">
				$('#documentContent').load("user/document.loadList.action?currentPage=1&type=all");
		</script>
		<!-- 分页 -->	
		<div id="pageScript">
  				<jsp:include page="../common/paging.jsp" flush="true"></jsp:include>
  		</div>	
  			<script type="text/javascript">
  				$(function(){
  					var _count = ${pageTotal};
  					_count = parseInt(_count/ 10) + (_count % 10 == 0 ? 0 : 1);
	  				$('#pageScript .pagination').jqPagination({
	 			       link_string: '/?page={page_number}',
	 			       current_page: _count==0?0:1,
	 			       max_page: _count,
	 			       paged: function(page){
	 			    	  $('#documentContent').load("user/document.loadList.action?type=all&currentPage="+page);
	 			    	   document.getElementById('documentContent').scrollIntoView(true);
	 			       }
	 			  	});
  				});
  			</script>
	</body>
</html>