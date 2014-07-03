$(function(){
    //修改头像
    $('#headImage').change(function(){
        ajaxFileUpload();
    });
    function ajaxFileUpload(){
        $.ajaxFileUpload({
            url: 'json/user.editHead.action',
            secureuri: false,
            fileElementId: 'headImage',
            dataType: 'json',
            success: function(data, status){
                var _image = data.imageFile;
                var _path = $.cookie("FILE_SERVER_URL");
                $('#myHeadImage').attr("src", _path + _image.url);
                $('.user-head').attr("src", _path + _image.url);
                $('#headImage').change(function(){
                    ajaxFileUpload();
                });
            },
            error: function(data, status, e){
                $('#headImage').change(function(){
                    ajaxFileUpload();
                });
            }
        });
    }
    //限制字数
    $('#userName,#userEmail,#oldPassword,#newPassword,#surePassword').bind("keyup change", function(){
        var $this = $(this);
        var maxlength = parseInt($this.attr("maxlength"), 10);
        var select = '#' + $this.attr("id");
        if ($this.val().length >= maxlength) {
            limitLength(select, maxlength);
        }
        $this.next().find('.number').html(canInput(select, maxlength));
    });
    //基本信息修改
    $('#saveBaseInfo').click(function(){
        var _name = $('#userName').val().trim();
        var _email = $('#userEmail').val().trim();
        var _sex = $('input[type=radio][name=sex]').val();
        if (_name == "") {
            myMsg("请输入用户名");
            return;
        }
        if (_email == "") {
            myMsg("请输入邮箱");
            return;
        }
        if (checkEmail(_email) == false) {
            myMsg("邮箱格式不正确,例如：zhangsan@sina.com");
            return;
        }
        $.post("json/user.editBase.action", {
            name: _name,
            email: _email,
            sex: _sex
        }, function(data){
            myMsg("修改成功");
            $('#currentUser').html(data.userName);
            $('#content').load("user/user.loadIndex.action");
        }, "json");
    });
    //密码修改
    $('#savePassword').click(function(){
        var _old = $('#oldPassword').val().trim();
        var _new = $('#newPassword').val().trim();
        var _sure = $('#surePassword').val().trim();
        if (_old == "") {
            myMsg("请输入旧密码");
            return;
        }
        if (_new == "") {
            myMsg("请输入新密码");
            return;
        }
        if (_new.length < 6) {
            myMsg("密码不能少于6位");
            return;
        }
        if (_sure == "") {
            myMsg("请再次输入新密码");
            return;
        }
        $.post("json/user.editPassword.action", {
            password: _old,
            newPassword: _new,
            surePassword: _sure
        }, function(data){
            if (data.result != "success") {
                myMsg(data.result);
            }
            else {
                $('#oldPassword').val("");
                $('#newPassword').val("");
                $('#surePassword').val("");
                sureAlert("密码修改成功，请重新登录平台", exitSystem);
            }
        }, "json");
    });
    //
    $("#emailLogin").on('switchChange.bootstrapSwitch', function(event, state){
        $.post("json/user.editEmailLogin.action", {
            emailLogin: state
        }, function(data){
        }, "json");
    });
    $('#messageTab').click(function(){
        $('#pageScript').show();
        $('#messageList').load("user/message.listPaging.action?currentPage=1");
        resetPaging();
    });
    //分页数据初始化
    function resetPaging(){
        $.post("json/message.getPageTotal.action", function(data){
            var _count = data.pageTotal;
            $('.pagination').jqPagination({
                link_string: '/?page={page_number}',
                current_page: _count == 0 ? 0 : 1,
                max_page: _count,
                paged: function(page){
                    $('#messageList').load("user/message.listPaging.action?currentPage=" + page);
                    document.getElementById('messageList').scrollIntoView(true);
                }
            });
        }, "json");
    }
    //详细消息
    $('#messageList').delegate('.message-detail', 'click', function(){
        var _id = $(this).attr("data-id");
        $.post("json/message.read.action", {
            id: _id
        }, "json");
        $('#messageList').load("user/message.loadDetail.action?id=" + _id);
        $('#pageScript').hide();
    });
    //删除消息
    $('#messageList').delegate('.delete-message', 'click', function(){
        var $this = $(this);
        var _id = $this.attr("data-id");
        $.post("json/message.delete.action", {
            id: _id
        }, function(data){
            $this.parent().parent().fadeOut();
            $this.parent().parent().remove();
            if ($('#messageList .table.table-hover.table-striped tbody').html().trim() == "") {
                $('#messageTab').click();
            }
            else {
                resetPaging();
            }
        }, "json");
    });
    //消息冒泡
    setInterval(function(){
        $('#messageTab .badge').html($('#newCount').html());
    }, 1000);
});
