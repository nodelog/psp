$(function(){
    //加载页面内容
    $.ajax({
        dataType: "html",
        async: false,
        url: "user/problem/problemIndex.jsp",
        success: function(data){
            $('#content').html(data);
        }
    });
    
    //返回顶部
    $(window).bind('scroll resize', function(){
        $("#myBack").goToTop();
    });
});
