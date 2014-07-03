<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
	</head>
 
	<body>
    	<div class="gigantic pagination">
					<input type="hidden" id="pageTotal" value="1"/>
				    <a href="#" class="first" data-action="first" title="首页">首页</a>
				    <a href="#" class="previous" data-action="previous" title="上一页">上一页</a>
				    <input type="text" readonly="readonly" title="输入页数回车跳转"/>
				    <a href="#" class="next" data-action="next" title="下一页">下一页</a>
				    <a href="#" class="last" data-action="last" title="末页">末页</a>
		</div>
	</body>
</html>