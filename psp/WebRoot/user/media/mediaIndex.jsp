<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE HTML>
<html>
<head>
<base
	href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
	<title>多媒体首页</title>
	<link rel="stylesheet" href="css/mediaelementplayer.min.css" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="css/media.css" />
	<script src="js/mediaelement-and-player.min.js"></script>
	<script type="text/javascript" src="js/foucsbox.js"></script>
	<script type="text/javascript" src="js/media.js"></script>
</head>
<body>
	<%--页面内容--%>
	<div id="header">
		<%--焦点图--%>
		<div class="foucs_view">
			<script type="text/javascript">
				$('#header .foucs_view').load("user/media.loadPicFilm.action");
			</script>
		</div>
		<%--数据统计--%>
		<div class="count">
			<div class="myCount">
				<ul class="nav nav-tabs">
				  <li class="active"><a href="javascript:void(0)">平台多媒体量</a></li>
				  <li class="un_active"><a href="javascript:void(0)">我的上传量</a></li>
				</ul>
				<div class="border">
					<div class="myUpload">
						<div class="count_no">电影:<span class="number">${allFilmCount }</span>部</div>
						<div class="count_no">音乐:<span class="number">${allMusicCount }</span>首</div>
					</div>
					<div class="myDown">
						<div class="count_no">电影:<span class="number">${userFilmCount }</span>部</div>
						<div class="count_no">音乐:<span class="number">${userMusicCount }</span>首</div>
					</div>
				</div>
			</div>
			<div class="myCount">
				<ul class="nav nav-tabs">
				<li class="active" id="refeshOnline" title="刷新"><a href="javascript:void(0)">平台在线人数&nbsp;<i class="glyphicon glyphicon-refresh"></i></a></li>
				</ul>
				<div>
					<div class="border">
						<div class="count_no"><span class="number" id="onlineCount">${onlineCount }</span>人在线</div>
					</div>
				</div>
			</div>
		</div>
		<div class="clear"></div>
	</div>
	<%--视频区--%>
	<div id="film">
		  <div class="panel panel-success">
			  <div class="panel-heading film-head">
					<ul class="nav nav-tabs">
						<li><span id="player" class="glyphicon glyphicon-film" title="打开/隐藏视频播放器"></span></li>
						<li class="active allFilm"><a href="javascript:void(0)">全部视频</a></li>
						<li class="myFilm"><a href="javascript:void(0)">我的上传的视频</a></li>
						<li class="upload" ><button type="button" class="btn btn-success"><span class="glyphicon glyphicon-chevron-down"></span>&nbsp;上传视频&nbsp;<span class="badge"></span></button></li>
					</ul>
			  </div>
			  <div class="panel-body film-panel allFilm active" >
			  	<div id="filmPanel">
			  		<script type="text/javascript">
			  			$(function(){
			  				$('#filmPanel').load("user/media.listpaging.action?scope=film&currentPage=1");
			  			});
			  		</script>
				</div>
				<%--视频分页--%>
				<div class="film_paging">
					<jsp:include page="../common/paging.jsp" flush="true"></jsp:include>
					<script type="text/javascript">
						var _count = parseInt(${allFilmCount}/ 10) + (${allFilmCount} % 10 == 0 ? 0 : 1);
		    			 $('.allFilm .film_paging .pagination').jqPagination({
		    			       link_string: '/?page={page_number}',
		    			       current_page:  _count==0?0:1,
		    			       max_page:_count,
		    			       paged: function(page){
		    			    	   $('#filmPanel').load("user/media.listpaging.action?scope=film&currentPage="+page);
		    			    	   document.getElementById('film').scrollIntoView(true);
		    			       }
		    			  });
	    			</script>
				</div>
			</div>
			  <div class="panel-body film-panel myFilm" >
			  	<div id="myFilmPanel">
			  		<script type="text/javascript">
			  			$(function(){
			  				$('#myFilmPanel').load("user/media.listpagingByUser.action?scope=userFilm&currentPage=1");
			  			});
			  		</script>
				</div>
				<%--视频分页--%>
				<div class="film_paging">
					<jsp:include page="../common/paging.jsp" flush="true"></jsp:include>
					<script type="text/javascript">
						var _count = parseInt(${userFilmCount}/ 10) + (${userFilmCount} % 10 == 0 ? 0 : 1);
		    			 $('.myFilm .film_paging .pagination').jqPagination({
		    			       link_string: '/?page={page_number}',
		    			       current_page:  _count==0?0:1,
		    			       max_page:_count,
		    			       paged: function(page){
		    			    	   $('#myFilmPanel').load("user/media.listpagingByUser.action?scope=userFilm&currentPage="+page);
		    			    	   document.getElementById('film').scrollIntoView(true);
		    			       }
		    			  });
	    			</script>
				</div>
			</div>
		</div>
		<%--上传视频--%>
		<div class="upload-div">
			<div class="panel panel-primary">
				  <div class="panel-heading">上传视频</div>
				  <div class="panel-body">
				      <form role="form">
						  <div class="form-group">
						    <label for="fileImg">添加背景预览图</label>
						    <input type="file" id="fileImg">
						  </div>
						  <div class="form-group">
						    <label for="filmFile">选择视频文件</label>
						    <input type="file" id="filmFile" name="film">
						    <ol id="successList" class="successList">
						    </ol>
						    <p class="help-block">只支持Mp4、WebM、Ogg格式在线播放</p>
						  </div>
						  <div class="form-group">
						    <label for="filmName">视频名称</label>
						    <input type="text" class="form-control" id="filmName" maxlength="32" name="name" placeholder="默认使用上传的视频的名称" title="修改自己喜欢的名称">
						    <span>您还可以输入<span class="number">32</span>个字</span>
						  </div>
						  <div class="checkbox">
						    <label>
						      <input type="checkbox" id="filmProtocol" checked="checked">同意上传协议，上传的视频仅限用于学习与研究之目的，没有任何商业用途。
						    </label>
						  </div>
						  <button type="button" id="uploadFile" class="btn btn-primary">上传视频</button>
						</form>
				  </div>
				   <div class="panel-footer">折叠上传面板可以后台上传</div>
			</div>
		</div>	
		<%--播放器--%>
		<div class="player-div">
			<div class="panel panel-default">
				  <div class="panel-heading">视频播放器<span class="glyphicon glyphicon-minus" title="最小化"></span></div>
				  <div class="panel-body">
				      <video width="940" height="460" id="filmePlayer" poster="">
						<source src="" type="video/mp4" title="mp4">
						<source src="" type="video/webm" title="webm">
						<source src="" type="video/ogg" title="ogg">
						对不起，你的浏览器不支持HTML5视频播放器，请下载后观看。
					</video>
				  </div>
				  <div class="panel-footer"><span class="current">请选择要播放的视频</span><a href="javascript:void(0)" target="_blank" class="btn btn-default" role="button" data-id="" data-type="" data-url="" disabled="disabled"><span class="glyphicon glyphicon-cloud-download"></span>&nbsp;下载</a>
				  	<div class="clear"></div>
				  </div>
			</div>
		</div>							  		
	</div>
	<%--音乐区--%>
	<div class="music-upload"><!-- 上传音乐 -->
			<div class="panel panel-primary">
				  <div class="panel-heading">上传音乐</div>
				  <div class="panel-body">
				      <form role="form">
						  <div class="form-group">
						    <label for="musicFile">选择音乐文件</label>
						    <input type="file" id="musicFile" name="music">
						    <ol id="successMusicList" class="successList">
						    </ol>
						    <p class="help-block">只支持Mp3、Wav、Ogg格式在线播放</p>
						  </div>
						  <div class="form-group">
						    <label for="musicName">音乐名称</label>
						    <input type="text" class="form-control" id="musicName" maxlength="32" name="name" placeholder="默认使用上传的音乐的名称" title="修改自己喜欢的名称">
						     <span>您还可以输入<span class="number">32</span>个字</span>
						  </div>
						  <div class="checkbox">
						    <label>
						      <input type="checkbox" id="musicProtocol" checked="checked">同意上传协议，上传的音乐仅限用于学习与研究之目的，没有任何商业用途。
						    </label>
						  </div>
						  <button type="button" id="uploadMusicFile" class="btn btn-primary">上传音乐</button>
						</form>
				  </div>
				   <div class="panel-footer">折叠上传面板可以后台上传</div>
			</div>
		</div>	<%--上传音乐结束 --%>
	<div id="music">
		<div class="panel panel-info"">
		  <div class="panel-heading music-head">
				<ul class="nav nav-tabs">
					<li><span id="musicPlayer" class="glyphicon glyphicon-music" title="打开/隐藏音乐播放器"></span></li>
					<li class="active allMusic"><a href="javascript:void(0)">全部音乐</a></li>
					<li class="myMusic"><a href="javascript:void(0)">我的上传的音乐</a></li>
					<li class="music-player">
						<audio controls="controls" width="350px" height="30px">
						  <source src="" type="audio/mpeg">
						  <source src="" type="audio/ogg">
						  <source src="" type="audio/wav">
						      对不起，你的浏览器不支持HTML5音乐播放器，请下载后播放。
						</audio>
					</li>
					<li class="current">&nbsp;<span class="current"></span></li>
					<li class="upload"><button type="button" class="btn btn-info"><span class="glyphicon glyphicon-chevron-down"></span>&nbsp;上传音乐&nbsp;<span class="badge"></span></button></li>
				</ul>
		  </div>
		   <div class="panel-body music-panel allMusic active" >
			  	<div id="musicPanel">
			  		<script type="text/javascript">
			  			$(function(){
			  				$('#musicPanel').load("user/media.listpaging.action?scope=music&currentPage=1");
			  			});
			  		</script>
				</div>
				<%--音乐分页--%>
				<div class="music_paging">
					<jsp:include page="../common/paging.jsp" flush="true"></jsp:include>
					<script type="text/javascript">
						var _count = parseInt(${allMusicCount}/ 10) + (${allMusicCount} % 10 == 0 ? 0 : 1);
		    			 $('.allMusic .music_paging .pagination').jqPagination({
		    			       link_string: '/?page={page_number}',
		    			       current_page:  _count==0?0:1,
		    			       max_page:_count,
		    			       paged: function( page){
		    			    	   $('#musicPanel').load("user/media.listpaging.action?scope=music&currentPage="+page);
		    			    	   document.getElementById('music').scrollIntoView(true);
		    			       }
		    			  });
	    			</script>
				</div>
			</div>
			  <div class="panel-body music-panel myMusic" >
			  	<div id="myMusicPanel">
			  		<script type="text/javascript">
			  			$(function(){
			  				$('#myMusicPanel').load("user/media.listpagingByUser.action?scope=userMusic&currentPage=1");
			  			});
			  		</script>
				</div>
				<%--视频分页--%>
				<div class="music_paging">
					<jsp:include page="../common/paging.jsp" flush="true"></jsp:include>
					<script type="text/javascript">
						var _count = parseInt(${userMusicCount}/ 10) + (${userMusicCount} % 10 == 0 ? 0 : 1);
		    			 $('.myMusic .music_paging .pagination').jqPagination({
		    			       link_string: '/?page={page_number}',
		    			       current_page: _count==0?0:1,
		    			       max_page:_count,
		    			       paged: function(page){
		    			    	   $('#myFilmPanel').load("user/media.listpagingByUser.action?scope=userMusic&currentPage="+page);
		    			    	   document.getElementById('music').scrollIntoView(true);
		    			       }
		    			  });
	    			</script>
				</div>
			</div>
		</div>
	</div><%--音乐结束--%>
</body>
</html>
<script>
							$('video,audio').mediaelementplayer({
							    startVolume: 0.5,
							    loop: true,
							    enableAutosize: true,
							    // the order of controls you want on the control bar (and other plugins below)
							    features: ['playpause','progress','current','duration','tracks','volume','fullscreen']
							});
						</script>