<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib uri="/struts-tags"  prefix="s"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<title>问题详情</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<meta name="author"content="Zero_and_Null,wangyachao0991@sina.cn">  
		<link rel="Shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/problem.css">
		<link rel="stylesheet" type="text/css" href="css/layer-1.8.1.css" />
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<script type="text/javascript" src="js/layer-1.8.1.min.js"></script>
		<script type="text/javascript" src="js/problemDetial.js"></script>
		
	</head>
 
	<body>
    	<div id="problemDetial">
    		<div class="qa_title">
    			<i class="qa_ico"></i>
    			<h2  data-id="${problemDetial.id }">
    				${problemDetial.title }
    				<s:if test="#request.problemDetial.status==1">
	    			<span class="unresolved">(未解决)</span>
	    			</s:if>
	    			<s:elseif test="#request.problemDetial.status==2">
		    			<span class="resolved">(已解决)</span>
	    			</s:elseif>
    			</h2>
    			
    		</div>
    		<div class="qa_info">
    			提问者悬赏：<span class="score">${problemDetial.score}公益币</span>&nbsp;|&nbsp;提问者：<s:if test="#request.problemDetial.user.id==#session.user.id">我</s:if><s:else>${problemDetial.user.name }</s:else> &nbsp;|&nbsp;分类：${problemDetial.category.name }&nbsp;|&nbsp;提问时间：<fmt:formatDate value="${problemDetial.createTime }" type="both"
             pattern="yyyy-MM-dd HH:mm:ss" />
    		</div>
    		
    		<div class="qa_detail_content">
	    		<div class="detial_text">
	    			<p>${problemDetial.content }</p>
	    				<img data-url="${problemImage.url }" src=""/>
		    			<script type="text/javascript">
		    				var _img =$('#problemDetial div.detial_text img');
		    				var fileServer = $.cookie("FILE_SERVER_URL");
		    				var _src =_img.attr("data-url");
		    				if(_src!=""&&_src!=null){
		    					_src = fileServer+_src;
		    					_img.attr("src",_src);
		    				}else{
		    					_img.remove();
		    				}
		    			</script>
	    		</div>
	    		<s:if test="#request.problemDetial.status!=2">
	    			<s:if test="#request.problemDetial.user.id!=#session.user.id">
		    		<a href="javascript:void(0)" class="i_want_answer">我要回答这个问题</a>	
		    		<div class="answer_layer">
		    			<div class="answer_box">
			    			<textarea placeholder="请输入你的答案"></textarea>
		    			</div>
		    			<a href="javascript:void(0)">回答问题</a>
		    		</div>
	    			</s:if>
	    		</s:if>
    		</div>
    		<div class="answer_list">
    		<span class="count">
    			<s:if test="#request.problemDetial.answers.size>0">
    				共有<s:property value="#request.problemDetial.answers.size"/>个答案
	    		</s:if>
	    		<s:else>
	    			暂无答案
	    		</s:else>
    		</span>
    		
    		<s:iterator value="#request.problemDetial.answers" var="item" status="answer">
	    		<dl>
	    			<dt class="auther">
	    				回答者：<s:if test="#item.user.id==#session.user.id">我</s:if><s:else>${item.user.name}</s:else>&nbsp;|&nbsp;等级：${item.user.level.levelRule.levelNumber}&nbsp;|&nbsp;回答时间：<fmt:formatDate value="${item.createTime}" type="both"
             pattern="yyyy-MM-dd HH:mm:ss" />
	    				<s:if test="#item.status==2">
	    					<span class="best">最佳答案</span>
	    				</s:if>
	    				<s:elseif test="#session.user.id==#request.problemDetial.user.id">
	    					<s:property value="#request.problemDetial.status"/>
	    					<s:if test="#request.problemDetial.status!=2">
	    					<span class="to_best" data-id="${item.id }">选为最佳答案</span>
	    					</s:if>
	    				</s:elseif>
	    			</dt>
	    			<dt class="answerText">${item.content }</dt>
	    		</dl>
    		</s:iterator>
    		</div>
    	</div>
	</body>
</html>