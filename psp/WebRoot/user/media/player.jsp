<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<base
	href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>HTML5 MediaElement - Events</title>

	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/mediaelement-and-player.min.js"></script>
	<link rel="stylesheet" href="css/mediaelementplayer.css" />
</head>
<body>



<video width="640" height="360" id="player1">
	<source src="user/media/video.mp4" type="video/mp4" title="mp4">
	<source src="../media/echo-hereweare.webm" type="video/webm" title="webm">
	<source src="../media/echo-hereweare.ogv" type="video/ogg" title="ogg">
</video>

<script>
$('video').mediaelementplayer({
	success: function(media, node, player) {
		var events = ['loadstart', 'play','pause', 'ended'];
		for (var i=0, il=events.length; i<il; i++) {
			var eventName = events[i];
			media.addEventListener(events[i], function(e) {
				$('#output').append( $('<div>' + e.type + '</div>') );
			});
		}
	}
});
</script>

</body>
</html>