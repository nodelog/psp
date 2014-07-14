function myMsg(_msg,_height,index){//my msg dialog
    if(typeof(_height) == "undefined"){
        _height='100px';
    }
    $.layer({
        shade: [0],
        title: false,
        closeBtn: [1, true],
        time: 2,
        offset: [_height, '50%'],
        dialog: {
            btns: 0,
            type: -1,
            msg: _msg
        },
        end: function(){
            parent.layer.close(index);
        }
    });
}
$(function(){//my jquery code
    var index=0;
    var loginHtml = $('.js-login-panel').html();
    $('.js-login-panel').html("");

    $('.js-login-btn').click(function(){//open login panel
        index = $.layer({
            type: 1,
            title: 'CMS Login',
            area: ['420px', '260px'],
            border:[5,0.3,'#e5e5e5'],
            shade: [0.3,'#000'],
            shift: 'top', //从左动画弹出
            page: {
                html: loginHtml
            }
        });
    });

    $('.js-body').delegate('.js-signIn-btn','click',function(){//sign in
        var userName = $('.js-login-username').val().trim();
        var password = $('.js-login-password').val().trim();
        if(userName==""){
            myMsg("UserName is empty");
        }else if(password==""){
            myMsg("Password is empty");
        }else {
            $.post("/user/login", {
                userName: userName,
                password: password
            }, function (data) {
                var result = data.success;
                if (result) {//success
                    layer.close(index);
                    $('.js-user-bar').html(userName);
                }
                myMsg(data.msg);
            }, "json");
        }
    });

    //register
    var registerHtml = $('.js-register-panel').html();
    $('.js-register-panel').html("");
    $('.js-register-btn').click(function(){//open register panel
        index = $.layer({
            type: 1,
            title: 'CMS Register',
            area: ['420px', '260px'],
            border:[5,0.3,'#e5e5e5'],
            shade: [0.3,'#000'],
            shift: 'top',
            page: {
                html: registerHtml
            }
        });
        console.log("index:"+index);
    });
    $('.js-body').delegate('.js-signUp-btn','click',function(){//sign up
        var userName = $('.js-register-username').val();
        var password = $('.js-register-password').val().trim();
        var password2 = $('.js-register-password2').val().trim();
        if(userName==""){
            myMsg("UserName is empty");
        }else if(password==""){
            myMsg("Password is empty");
        }else if(password2==""){
            myMsg("Confirm password is empty");
        }else if(password!=password2){
            myMsg("The two passwords don't match");
        }else{
            $.post("/user/reg", {
                userName: userName,
                password:password,
                password2:password2
            }, function(data){
                var result = data.success;
                var msg = data.msg;
                if(result){//success
                    layer.close(index);
                }
                myMsg(data.msg);
            }, "json");
        }
    });


    //backtotop
    var o = ($("#wrapper"), $("#backtotop")), e = ($("#sidebar"), $(window).height() - o.height() - 200);
    o.click(function () {
        return $("html,body").animate({scrollTop: 0}), !1
    }), $(window).scroll(function () {
        var t = $(window).scrollTop();
        t > 200 ? o.fadeIn() : o.fadeOut()
    }), n(), $(window).resize(n), $(".topic_content a,.reply_content a").attr("target", "_blank"), prettyPrint()

});