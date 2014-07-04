$(function(){
    //记住我
    var psp_name = $.cookie("PSP_USERID");
    var psp_passwd = $.cookie("PSP_USERPD");
    if (psp_name != null && psp_name != "") {
        $('input[name="name"]').val(psp_name);
    }
    if (psp_passwd != null && psp_passwd != "") {
        $('input[name="password"]').val(psp_passwd);
    }
    
    //登陆请求
    $('#login').click(function(){
        var name = $('input[name="name"]').val();
        var passwd = $('input[name="password"]').val();
        var _autoLogin = $('#autoLogin').prop("checked");
        
        if (name == "") {
            myMsg("请输入用户名");
            $('input[name="name"]').focus();
            return;
        }
        if (passwd == "") {
            myMsg("请输入密码");
            $('input[name="password"]').focus();
            return;
        }
        $.post("commonJson/user.login.action", {
            name: name,
            password: passwd
        }, function(data){
            var result = data.result;
            if (result == "success") {
                if (_autoLogin == true) {
                    $.cookie("PSP_USERID", name, {
                        expires: 30
                    });
                    $.cookie("PSP_USERPD", passwd, {
                        expires: 30
                    });
                }
				$('input[name="password"]').val("");
				var domain = $.cookie("DOMAIN_HOST");
                location.href = domain+"index.jsp";
            }
            else {
                myMsg('用户名/邮箱或密码错误');
            }
        }, "json");
    });
    //msg
    function myMsg(_msg){
        $.layer({
            shadeClose: true,
            time: 2,
            title: false,
            closeBtn: [0, true],
            offset: ['550px', '50%'],
            dialog: {
                btns: 0,
                type: -1,
                msg: _msg
            }
        });
    }
    //绑定回车
    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            $('#login').click();
        }
    }
    //边框动态样式
    $('#login_panel .name input,#login_panel .password input').click(function(){
        var $this = $(this);
        $this.parent().css("border", "1px solid #25BD2B");
        if ($this.attr("type") == "password") {
            $('#login_panel .name').css("border-bottom", "none");
        }
    });
    $('#login_panel .name input,#login_panel .password input').blur(function(){
        var $this = $(this);
        $this.parent().css("border", "1px solid #ddd");
        if ($this.attr("type") == "password") {
            $('#login_panel .name').css("border-bottom", "1px solid #ddd");
            $this.parent().css("border-top", "none");
        }
    });
});
