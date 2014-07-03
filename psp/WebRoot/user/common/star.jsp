<%@ page contentType="text/html; charset=UTF-8"%>
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
		<link rel="stylesheet" type="text/css" href="css/star.css"/>
	</head>
 
	<body>
    <fieldset class="rating">
    <input type="radio" id="star5" name="rating" value="5" /><label for="star5" data-toggle="tooltip" title="力荐">力荐</label>
    <input type="radio" id="star4" name="rating" value="4" /><label for="star4" data-toggle="tooltip" title="推荐">推荐</label>
    <input type="radio" id="star3" name="rating" value="3" /><label for="star3" data-toggle="tooltip" title="还行">还行</label>
    <input type="radio" id="star2" name="rating" value="2" /><label for="star2" data-toggle="tooltip" title="较差">较差</label>
    <input type="radio" id="star1" name="rating" value="1" /><label for="star1" data-toggle="tooltip" title="很差">很差</label>
	</fieldset>
	<script type="text/javascript">
	$('.rating label').mouseover(function(){
		var $this= $(this);
		$this.tooltip('show');
	});
	</script>
	</body>
</html>