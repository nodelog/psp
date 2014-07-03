$(function(){
    //熔岩灯菜单
    $(".menu").lavaLamp({
        fx: "backout",
        speed: 400,
        click: function(event, menuItem){
            return true;
        }
    });
    
    $('#public').click(function(){
        loading();
        $('#content').load("user/public/publicIndex.jsp");
        loadingEnd();
    });
    $('#question').click(function(){
        loading();
        $('#content').load("user/problem/problemIndex.jsp");
        loadingEnd();
        //		location.href = "user/problem/problemIndex.jsp";
    });
    $('#skill').click(function(){
        loading();
        $('#content').load("user/skill.skillIndex.action");
        loadingEnd();
    });
    $('#document').click(function(){
        loading();
        $('#content').load("user/document.documentIndex.action");
        loadingEnd();
    });
    $('#soft').click(function(){
        loading();
        $('#content').load("user/software.softwareIndex.action");
        loadingEnd();
    });
    $('#download').click(function(){
        loading();
        $('#content').load("user/download.downloadIndex.action");
        loadingEnd();
    });
    $('#media').click(function(){
        loading();
        $('#content').load("user/media.mediaIndex.action");
        loadingEnd();
    });
    $('#user').click(function(){
        loading();
        $('#content').load("user/user.loadIndex.action");
        loadingEnd();
    });
});
