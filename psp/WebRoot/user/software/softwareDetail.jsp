<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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

</head>

<body>
	<div class="panel panel-success">
		<div class="panel-heading">软件详情</div>
		<div class="panel-body">
			<blockquote>
				<s:if test="#request.software.bgImage!=null">
					<img src="${fileServer }${software.bgImage.url}" class="min-image" />
				</s:if>
				<p class="software-title">${software.name }</p>
				<button type="button" class="btn btn-default pull-right download"
					data-id="${software.id }" data-type="${software.category.id }"
					data-url="${software.url }">
					<i class="glyphicon glyphicon-cloud-download"></i>&nbsp;下载
				</button>
				<div class="clear"></div>
				<small> <s:if
						test="#request.software.introduction==null||#request.software.introduction.length()==0">
									  	暂无简介
									  </s:if> <s:else>
						<p class="introduction">${software.introduction }</p>
					</s:else> </small> 
					<small> 
					<cite title="Source Title">大小：${software.size
						}</cite> <cite title="Source Title">上传时间： <fmt:formatDate
							value="${software.uploadTime }" type="both"
							pattern="yyyy-MM-dd HH:mm:ss" /> </cite> <cite title="Source Title">上传者：${software.user.name
						}</cite> <cite title="Source Title">评分：${software.grade }分</cite>
					<cite title="Source Title">浏览量：${viewCount}</cite>
					<cite title="Source Title">下载量：${downloadCount}</cite>
					<cite title="Source Title">${gradeCount}人评分</cite>
					<cite title="Source Title">${commonCount}人评论</cite>
					<cite title="Source Title">分类：${software.category.name }</cite>
				</small>
			</blockquote>
			<input type="hidden" value="${software.id }" id="softwareId">
			 <s:if test="#request.software.user.id!=#session.user.id">
			<jsp:include page="../common/star.jsp" flush="true"></jsp:include>
			<script>
			if(${myGrade}!=0){
				 $('.rating').prop("disabled","disabled");
				 $('.rating #star'+${myGrade}).prop("checked","checked");
			}
			</script>
			</s:if>
		</div>
	</div>
</body>
</html>