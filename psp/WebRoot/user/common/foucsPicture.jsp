<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<link rel="stylesheet" type="text/css" href="css/foucsbox.css" />
		<script type="text/javascript" src="js/foucsbox.js"></script>
	</head>
	<body>
	<div id="foucsBox">
        <ul class="imgCon">
            <!--展示图片开始-->
            <s:iterator value="#request.fileList"  var="item" status="file">
            <li><a href="javascript:void(0);">
                <img class="pic-film" src="${fileServer}${item.url }" title="点击播放" data-url="${item.appUrl }" data-image="${item.url }" data-name="${item.name }"/></a>
                <div class="imgTitle">
                <a href="javascript:void(0);" target="_blank" title="${item.name }">
                <s:if test="#item.name.length()>30">
					 <s:property value='#item.name.substring(0,28)'/>...
				</s:if>   
				<s:else>      
					 <s:property value='#item.name'/>
				 </s:else>
                </a></div>
                <div class="showPage"></div>
            </li>
            </s:iterator>
            
            <!--展示图片结束-->
        </ul>
        <div class="foucs"></div>
        <div class="rBtn foucsButton">
            <span></span>
            <img />
        </div>
        <div class="lBtn foucsButton">
            <span></span>
            <img />
        </div>
    </div>
    </body>
</html>