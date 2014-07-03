<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
		<title></title>
		<link rel="Shortcut icon" href="favicon.ico" />
	</head>
 
	<body>
    
					    <s:iterator value="#request.userFilmList"  var="item" status="film"> 
					    	<s:if test='#film.count%5==1'>
			    				<div class="row">
					    	</s:if>
					    	<div class="col-sm-4 col-md-2">
							    <div class="thumbnail single-film userFilmList">
							      <div class="panel panel-default">
									  <div class="panel-heading" style="padding: 10px 5px;" title="${item.name }">
									  <s:if test="#item.name.length()>10">
									    <s:property value='#item.name.substring(0,8)'/>...
									 </s:if>   
									 <s:else>      
									     <s:property value='#item.name'/>
									 </s:else>
									  </div>
									  <div class="panel-body">
									    <img src="" class="film<s:property value='#film.count'/>">
									      <script type="text/javascript">
									      $(function(){
										    	if("${item.bgImage.url }"!=""){
											      	var host = $.cookie("FILE_SERVER_URL");
											      	_src= host+'${item.bgImage.url }';
											      	$('.userFilmList.thumbnail').find('img.film'+${film.count}).attr("src",_src);
										    	}else{
											      	$('.userFilmList.thumbnail').find('img.film'+${film.count}).attr("src","images/no-image.png");
										    	}
										      });
									      </script>
									  </div>
								  </div>	
							      <div class="caption">
							        <p>
							        <s:if test="#item.status==1">
								        <a href="javascript:void(0)" class="btn btn-success" role="button" data-id="${item.id }" data-type="${item.category.id }" ftp-url="${ftpServer }${item.url }" data-url="${item.url }" data-name="${item.name }" data-image="${item.bgImage.url }"><span class="glyphicon glyphicon-play"></span>&nbsp;播放</a> 
							        </s:if>
							        <s:if test="#item.status==2">
								        <button type="button" class="btn btn-success nonsupport" title="格式不支持"><span class="glyphicon glyphicon-play"></span>&nbsp;播放</button> 
							        </s:if>
							        <a href="${ftpServer }${item.url }" target="_blank"  class="btn btn-default" role="button" data-id="${item.id }" data-type="${item.category.id }" data-url="${fileServer }${item.url }"><span class="glyphicon glyphicon-cloud-download"></span>&nbsp;下载</a>
							        </p>
							      </div>
							    </div>
							</div>
					    <s:if test='#film.count%5==0'>
			    		</div>
					   </s:if>
				</s:iterator> 
	</body>
</html>