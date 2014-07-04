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
	</head>
 
	<body>
    	<div class="panel panel-default">
		  <div class="panel-heading">
		  	${skill.title }
		  </div>
		  <div class="panel-body">
		    <div class="row">
			   <div class="col-sm-11 col-md-11">
			    <div class="thumbnail">
			      <div class="caption">
			        <small>
						<cite title="Source Title">分类：${skill.category.name }</cite>
						<cite title="Source Title">发布时间：
						<fmt:formatDate value="${skill.createTime }" type="both" pattern="yyyy-MM-dd HH:mm:ss" />
						</cite>
						<cite title="Source Title">发布者：${skill.user.name }</cite>
						<cite title="Source Title">平均评分：${skill.grade }分</cite>
						<cite title="Source Title">浏览量：${skill.viewCount }</cite>
					</small>
			        <div class="detail-content">${skill.content }</div>
			      </div>
			    </div>
			        <s:if test="#request.skill.user.id!=#session.user.id">
			        <jsp:include page="../common/star.jsp" flush="true"></jsp:include>
					<script>
					if(${myGrade}!=0){
						 $('.rating').prop("disabled","disabled");
						 $('.rating #star'+${myGrade}).prop("checked","checked");
					}
					</script>
			        </s:if>
			        <s:if test="#request.skill.user.id==#session.user.id">
			        <span class="button-wrap pull-right" id="editSkill" data-id="${skill.id }"><a href="javascript:void(0)" class="button button-pill button-action">编辑</a></span>
			        </s:if>
			        <input type="hidden" value="${skill.id }" id="skillId">
			  </div>
			</div>
		  </div>
		</div>
	</body>
</html>