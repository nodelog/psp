$(function(){
    //管理员登录
    $('#adminLoginBtn').click(function(){
        var _name = $('#login-name').val().trim();
        var _password = $('#login-pass').val().trim();
        if (_name == "") {
            myMsg("请输入管理员账号",null,'400px');
            return;
        }
        if (_password == "") {
            myMsg("请输入管理员密码",null,'400px');
            return;
        }
        $.post("adminJson/admin.login.action", {
            name: _name,
            password: _password
        }, function(data){
            if (data.result == "success") {
                var domain = $.cookie("DOMAIN_HOST");
                location.href = domain + "admin/admin.jsp";
            }else{
				  myMsg("管理员账号或密码错误",null,'400px');
			}
        }, "json");
    });
	//退出
	$('#adminExit').click(function(){
		//退出
        myAlert("确定退出吗？", adminExit);
	});
});
