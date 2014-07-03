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
<link rel="stylesheet" type="text/css" href="css/download.css" />
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/download.js"></script>

</head>

<body>
<div id="download">
	<div class="row">
		<!-- 分类列表 -->
		<div id="leftColumn">
			<div class="list-group">
			  <a href="#meidaResource" data-toggle="collapse" class="list-group-item active-title">多媒体库<i class="glyphicon glyphicon-chevron-down pull-right"></i></a>
			  <div class="list-group" id="meidaResource">
			  	 <s:iterator value="#request.mediaCategory"  var="item" status="media">
			  	 	<s:if test="#media.count!=1">
					  	<a href="javascript:void(0)" class="list-group-item" data-id="${item.id }" data-total="${item.pageTotal }">${item.name } <span class="badge pull-right">${item.pageTotal }</span></a>
			  	 	</s:if>
			  	 	<s:else>
					  	<a href="javascript:void(0)" class="list-group-item currentResource" data-id="${item.id }" data-total="${item.pageTotal }">${item.name }<span class="badge pull-right">${item.pageTotal }</span></a>
			  	 	</s:else>
			  	 </s:iterator>	
			  </div>
			</div>
			<div class="list-group">
			  <a href="#documentResource" data-toggle="collapse" class="list-group-item active-title">文档资料<i class="glyphicon glyphicon-chevron-down pull-right"></i></a>
			  <div class="list-group" id="documentResource">
				  <s:iterator value="#request.documentCategory"  var="item" status="document">
				  	<a href="javascript:void(0)" class="list-group-item" data-id="${item.id }" data-total="${item.pageTotal }">${item.name }<span class="badge pull-right">${item.pageTotal }</span></a>
			  	 </s:iterator>	
			  </div>
			</div>
			<div class="list-group">
			  <a href="#softwareResource" data-toggle="collapse" class="list-group-item active-title">软件应用<i class="glyphicon glyphicon-chevron-down pull-right"></i></a>
			  <div class="list-group" id="softwareResource">
				 <s:iterator value="#request.softwareCategory"  var="item" status="software">
				  	<a href="javascript:void(0)" class="list-group-item" data-id="${item.id }" data-total="${item.pageTotal }">${item.name }<span class="badge pull-right">${item.pageTotal }</span></a>
			  	 </s:iterator>	
			  </div>
			</div>
			<div class="list-group">
			  <a href="#downloadHistory" data-toggle="collapse" class="list-group-item active-title">历史记录<i class="glyphicon glyphicon-chevron-down pull-right"></i></a>
			  <div class="list-group" id="downloadHistory">
				  	<a href="javascript:void(0)" class="list-group-item" data-id="" data-total="${pageTotal }">我的下载<span class="badge pull-right">${pageTotal }</span></a>
			  </div>
			</div>
		</div>
		<!-- 内容列表 -->
		<div  id="rightColumn">
			<div id="resourceList">
				<script type="text/javascript">
				var categoryId=$('.currentResource').attr("data-id");
				$('#resourceList').load("user/download.loadList.action?currentPage=1&categoryId="+categoryId);
				</script>
			</div>
  			<div id="pageScript">
  				<jsp:include page="../common/paging.jsp" flush="true"></jsp:include>
  			</div>	
  			<script type="text/javascript">
  				$(function(){
  					var _count = $('.currentResource').attr("data-total");
  					_count = parseInt(_count/ 10) + (_count % 10 == 0 ? 0 : 1);
	  				$('#rightColumn .pagination').jqPagination({
	 			       link_string: '/?page={page_number}',
	 			       current_page: _count==0?0:1,
	 			       max_page: _count,
	 			       paged: function(page){
	 			    	  var categoryId=$('.currentResource').attr("data-id");
	 					  $('#resourceList').load("user/download.loadList.action?currentPage="+page+"&categoryId="+categoryId);
	 			    	   document.getElementById('resourceList').scrollIntoView(true);
	 			       }
	 			  	});
  				});
  			</script>
  			
		</div>
		<div class="clear"></div>
	</div>
</div>	
</body>
</html>