$(function(){
    //显示删除输入框文字按钮
    var showDelete = function($this){
        if ($this.val() != "") {
            $this.next().show();
        }
        else {
            $this.next().hide();
        }
    }
    //给class=input控件帮顶keyup和change事件
    $('input[type!="button"].input').bind("keyup change", function(){
        var $this = $(this);
        showDelete($this);
        var maxlength = parseInt($this.prop("maxlength"), 10);
        var name = $this.prop("name");
        var select = 'input[name="' + name + '"]';
        limitLength(select, maxlength);
    });
    //点击输入框改变边框颜色
    $('.input').click(function(){
        var $this = $(this);
        showDelete($this);
        $this.parent().addClass("text-border");
    });
    //离开输入框还原边框颜色
    $('.input').blur(function(){
        var $this = $(this);
        showDelete($this);
        $this.parent().removeClass("text-border");
    });
    //点击删除按钮删除输入框文字
    $('.delete').click(function(){
        var $this = $(this);
        $this.prev().val("");
        $this.prev().focus();
        $this.hide();
    });
    
    //注册验证
    
    //用户名验证
    $('#name').blur(function(){
        var $this = $(this);
        var $error = $this.parent('div.text').next('div.error');
        var $errorText = $error.children('span.error-text');
        var value = $this.val();
        $error.addClass("error-show");
        if (value === "" || value === null) {
            checkHelp($error, $errorText, "error-ok", "error-error", "请输入用户名");
            return;
        }
        if (value.indexOf(" ") >= 0) {
            checkHelp($error, $errorText, "error-ok", "error-error", "用户名不能含有空格");
            return;
        }
        if (value.length < 6) {
            checkHelp($error, $errorText, "error-ok", "error-error", "用户名不能少于6位");
            return;
        }
        $.post("commonJson/checkUser.action", {
            name: value
        }, function(data){
            if (data.isExists === true) {
                checkHelp($error, $errorText, "error-ok", "error-error", data.msg);
                return;
            }
            else {
                checkHelp($error, $errorText, "error-error", "error-ok", "");
                return;
            }
        }, "json");
    });
    //密码验证
    $('#password').blur(function(){
        $('#name').blur();
        var $this = $(this);
        var $error = $this.parent('div.text').next('div.error');
        var $errorText = $error.children('span.error-text');
        var value = $this.val();
        $error.addClass("error-show");
        if (value === "" || value === null) {
            checkHelp($error, $errorText, "error-ok", "error-error", "请输入密码");
            return;
        }
        if (value.length < 6) {
            checkHelp($error, $errorText, "error-ok", "error-error", "密码不能少于6位");
            return;
        }
        checkHelp($error, $errorText, "error-error", "error-ok", "");
        return;
    });
    //确认密码验证
    $('#password2').blur(function(){
        $('#password').blur();
        var $this = $(this);
        var $error = $this.parent('div.text').next('div.error');
        var $errorText = $error.children('span.error-text');
        var value = $this.val();
        $error.addClass("error-show");
        if (value === "" || value === null) {
            checkHelp($error, $errorText, "error-ok", "error-error", "请再次输入密码");
            return;
        }
        if (value != $('#password').val()) {
            checkHelp($error, $errorText, "error-ok", "error-error", "两次密码输入不一致");
            return;
        }
        checkHelp($error, $errorText, "error-error", "error-ok", "");
        return;
    });
    //email验证
    $('#liveEmail').blur(function(){
        $('#password2').blur();
        var $this = $(this);
        var $error = $this.parent('div.text').next('div.error');
        var $errorText = $error.children('span.error-text');
        var value = $this.val();
        $error.addClass("error-show");
        if (value === "" || value === null) {
            checkHelp($error, $errorText, "error-ok", "error-error", "请输入邮箱地址");
            return;
        }
        var re = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var objExp = new RegExp(re);
        if (objExp.test(value) === false) {
            checkHelp($error, $errorText, "error-ok", "error-error", "邮箱格式不正确");
            return;
        }
        checkHelp($error, $errorText, "error-error", "error-ok", "");
        return;
    });
    
    //注册吗验证
    $('#authCode').blur(function(){
        $('#liveEmail').blur();
        var $this = $(this);
        var $error = $this.parent('div.text.authCode').siblings('div:last');
        var $errorText = $error.children('span.error-text');
        var value = $this.val();
        $error.addClass("error-show");
        if (value === "" || value === null) {
            checkHelp($error, $errorText, "error-ok", "error-error", "请输入验证码");
            return;
        }
        var authCode = $.cookie("authCode").toUpperCase();
        if ($this.val().toUpperCase() !== authCode) {
            checkHelp($error, $errorText, "error-ok", "error-error", "验证码不正确");
            return;
        }
        checkHelp($error, $errorText, "error-error", "error-ok", "");
        return;
        
    });
    //验证帮助方法
    function checkHelp(select, selectText, remove, add, value){
        select.removeClass(remove);
        select.addClass(add);
        selectText.html(value);
    }
    
    //注册
    $('input[type="button"].input').click(function(){
        var $this = $(this);
        var $name = $('#name');
        var $password = $('#password');
        var $password2 = $('#password2');
        var $email = $('#liveEmail');
        var $authCode = $('#authCode');
        $name.blur();
        $password.blur();
        $password2.blur();
        $email.blur();
        $authCode.blur();
        
        if ($('.error-ok').length < 5) {
            return;
        }
        $this.prop("disabled", "disabled");
        $this.val("正在加载...");
        $.post("commonJson/register.registerCheck.action", {
            name: $name.val(),
            password: $password.val(),
            email: $email.val(),
            authCode: $authCode.val()
        }, function(data){
            var msg = data.msg;
			var user = data.user;
            if (msg === "success") {
                $('div.form').animate({
                    height: "hide"
                }, "1000");
                $('div#email').animate({
                    height: "show"
                }, "1000");
                $('#step-number').html("2.");
                $('#step-text').html("验证邮箱激活码");
				$('#bindingEmail').html(user.email);
                $('.sendEmail').click();
                return;
            }
            $this.prop("disabled", false);
            $this.val("下一步");
            alert(msg);
            return;
        }, "json");
    });
    var isSend = true;
    $('.sendEmail').click(function(){
        $this = $(this);
        $this.html("正在发送...");
        var $email = $('#liveEmail');
        if (isSend == false) {
            return;
        }
        isSend = false;
        $.post("commonJson/register.reSendEmail.action", {
            email: $email.val()
        }, function(data){
            $this.removeClass("sendEmail");
            isSend = true;
            $this.html("重发激活码");
        }, "json");
    });
    
    $('#live-code-btn').click(function(){
        var live = checkLiveCode();
        $this = $(this);
        if (live == true) {
            $this.prop("disabled", "disabled");
            $this.val("正在加载...");
            var liveCodeValue = $('#live-code').val();
            
            $.post("commonJson/register.register.action", {
                liveCode: liveCodeValue
            }, function(data){
                var result = data.result;
                var msg = data.msg;
                var user = data.registerUser;
                if (result == "success") {
                    $('div#step-two').animate({
                        height: "hide"
                    }, "1000");
                    $('div#confirm').animate({
                        height: "show"
                    }, "1000");
                    $('#step-number').html("3.");
                    $('#step-text').html("用户注册成功");
                    $('#confirm i.reg_name').html(user.name);
                    $('#confirm i.reg_email').html(user.email);
                    return;
                }
                alert(msg);
                $this.prop("disabled", false);
                $this.val("下一步");
            }, "json");
            
        }
    });
    //刷新激活码
    function checkLiveCode(){
        var code = $('#live-code');
        if (code.val().trim() == "") {
            code.val("");
            code.attr("placeholder", "请输入激活码");
            code.focus();
            return false;
        }
        var liveCode = $.cookie("liveCode").toUpperCase();
        if (code.val().trim().toUpperCase() != liveCode) {
            code.val("");
            code.attr("placeholder", "激活码不正确");
            code.focus();
            return false;
        }
        return true;
    }
    //common
    //刷新验证码
    $('.authImg').click(function(){
        var $this = $(this);
        if (!$this) {
            return false;
        }
        var d = new Date();
        var src = "authImg.servlet?t=" + d;
        $this.prop("src", src);
    });
    //logo首页绑定
    $('.logo').bind("click", function(){
        location.href = "index.jsp";
    });
    
    //自定义title样式
    //	titleShow();
    //	function titleShow() {
    //		var oTitle=null;
    //		var sTitle=null;
    //		var aA=$('*');
    //		for(var i=0;i<aA.length;i++) {
    //			if(aA[i].title) {
    //				aA[i].onmouseover=function(ev) {
    //					sTitle=this.title;
    //					this.title='';
    //					oTitle=document.createElement('div');
    //					oTitle.className='titleShow';
    //					oTitle.innerHTML=sTitle;
    //					document.body.appendChild(oTitle);
    //				};
    //				aA[i].onmousemove=function(ev) {
    //					var ev=ev || window.event;
    //					oTitle.style.left=ev.clientX+10+'px';
    //					oTitle.style.top=ev.clientY+10+'px';
    //				}
    //				aA[i].onmouseout=function() {
    //					this.title=sTitle;
    //					document.body.removeChild(oTitle);
    //				}
    //			}
    //		}
    //	}
    //控制输入框输入长度
    function limitLength(select, length){
        if ($(select).val().length >= length) {
            $(select).val($(select).val().substring(0, length));
        }
    }
    
    //登陆跳转
    $('#login-btn,#login_btn').click(function(){
        var host = window.location.host;
        var url = window.location.href;
        var index = url.indexOf(host) + host.length + 1;
        index = url.indexOf("/", index) + 1;
        url = url.substring(0, index);
        location.href = url + "/login.jsp";
    });
});
