<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<title>我的提问</title>
		<link rel="Shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/problem.css">
		<link rel="stylesheet" type="text/css" href="css/layer-1.8.1.css" />
		<link rel="stylesheet" type="text/css" href="css/jqpagination.css" />
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/jquery.jqpagination.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
		<script type="text/javascript" src="js/myProblem.js"></script>
		
	</head>
 
	<body>
    	<div id="myProblem">
	    	<div class="header">我的提问</div>
	    	<div class="problemList">
	    	<s:if test="#request.myProblem==null||#request.myProblem.size()==0"><p>暂无数据</p></s:if>
	    		<s:iterator value="#request.myProblem" var="item" status="problem">
		    		<dl>
		    			<dt class="info">
		    				悬赏：${item.score }公益币&nbsp;|&nbsp;
		    				提问时间：<fmt:formatDate value="${item.createTime}" type="both" pattern="yyyy-MM-dd HH:mm:ss" />
		    					<s:if test="#item.status==1">
			    					<span>未解决</span>
		    					</s:if>
		    					<s:if test="#item.status==2">
			    					<span class="status">已解决</span>
		    					</s:if>
		    			</dt>
		    			<dt class="title problem_detail" data-id="${item.id }" title="点击查看详情">${item.title }</dt>
					</dl>	    			
	    		</s:iterator>
	    	</div>
    		<div class="my_paging">
    			<jsp:include page="../../user/common/paging.jsp" flush="true"></jsp:include>
    			<script type="text/javascript">
    			getPageTotal();
    			 function getPageTotal(){
    			        $.post("json/problem.loadCountByUser.action", function(data){
    			            var _count = data.pageTotal;
    			        	var _currentPage=${currentPage};
    			        	_currentPage=_count==0?0:_currentPage;    			            
    			            $('.pagination').jqPagination({
    			                link_string: '/?page={page_number}',
    			                current_page: _currentPage,
    			                max_page: _count,
    			                paged: function(page){
    			                    location.href="user/problem.loadProblemByUser.action?currentPage="+page;
    			                }
    			            });
    			        }, "json");
    			    }
    			</script>
    		</div>
    	</div>
	</body>
</html>