<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<title></title>
		<link rel="Shortcut icon" href="favicon.ico" />
			<script type="text/javascript" src="js/holder.js"></script>
	</head>
 
	<body>
     <div class="list-group" style="">
	     <s:iterator value="#request.userMusicList"  var="item" status="music"> 
			<span href="javascript:void(0)" class="list-group-item"  >
			<span class="number">${music.count }.</span>
			<span title="上传者：${item.user.name }">&nbsp;${item.name}</span>
			<span class="glyphicon glyphicon-headphones" data-url="${item.url }" data-name="${item.name }" title="播放"></span>
			<a href="${ftpServer }${item.url }" target="_blank" class="music_download" data-id="${item.id }" data-type="${item.category.id }"><span class="glyphicon glyphicon-cloud-download" data-id="${item.id }" data-type="${item.category.id }" data-url="${item.url }" title="下载"></span></a>
			</span>
		</s:iterator>			
		</div>
		<div class="clear"></div>
	</body>
</html>