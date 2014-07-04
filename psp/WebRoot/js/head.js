$(function(){
    var $personMenu = $('#personMenu');
    $('#personCenter').mouseover(function(){
        _show($personMenu);
    });
    $('#personCenter').mouseout(function(e){
        e.stopPropagation();
    });
    $('#person').mouseout(function(){
        _hide($personMenu);
    });
    $personMenu.mouseover(function(){
        _show($(this));
    });
    $personMenu.mouseout(function(){
        _hide($(this));
    });
    //logo首页绑定
    $('#logo').bind("click", function(){
		 loading();
        location.href = "index.jsp";
		loadingEnd();
    });
    
    //退出
    $('#exit').click(function(){
        var result = myAlert("确定退出吗？", exitSystem);
    });
    
    //个人中心
    $('#personCenter').click(function(){
		$('#user').click();
    });
	
	//在线人数
	setInterval(function(){
		$.post("json/user.countOnline.action", function(data){
            $('#onlineHead').html(data.onlineCount);
        }, "json");
	},1000);
	//消息接收
	setInterval(function(){
		$.post("json/message.getNewCount.action", function(data){
			var _newCount = data.newCount;
			if(_newCount>0){
	           $('#newCount').html(_newCount);
			   $('#personCenter').attr("title","有新消息");
			}else{
	           $('#newCount').html("");
			   $('#personCenter').attr("title","个人中心");
			}
        }, "json");
	},1000);
	
	$('#onlineCountDiv').click(function(){
		$.post("json/user.countOnline.action", function(data){
            $('#onlineHead').html(data.onlineCount);
        }, "json");
	});
});

function _show(element){
    element.addClass("show");
}

function _hide(element){
    element.removeClass("show");
}

function loading(){
    $("#circle").fadeIn(500);
    $("#circle1").fadeIn(500);
}

function loadingEnd(){
    $("#circle").fadeOut(100);
    $("#circle1").fadeOut(100);
}

