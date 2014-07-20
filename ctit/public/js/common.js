var index = 0;//layer index number
//my msg dialog
function myMsg(_msg, _height, index) {
    if (typeof(_height) == "undefined") {
        _height = '100px';
    }
    $.layer({
        shade: [0],
        title: false,
        closeBtn: [1, true],
//        border: [5, 0.3, '#e5e5e5'],
        time: 2,
        offset: [_height, '50%'],
        dialog: {
            btns: 0,
            type: -1,
            msg: _msg
        },
        end: function () {
            parent.layer.close(index);
        }
    });
}

//my alert dialog
function myAlert(_msg, callback) {
    index = $.layer({
        time: 0,
        title: "CMS Prompt",
        closeBtn: [0, true],
        border: [5, 0.3, '#e5e5e5'],
        shade: [0.3, '#000'],
        offset: ['300px', '50%'],
        btn: ['OK', 'Cancel'],
        dialog: {
            btns: 2,
            type: -1,
            msg: _msg,
            yes: function (index) {
                layer.close(index);
                callback();
            },
            no: function (index) {
                layer.close(index);
                return false;
            }
        }
    });
}

//my page dialog
function myPage(title, area, html, callback) {
    index = $.layer({
        type: 1,
        title: title,
        area: area,
        border: [5, 0.3, '#e5e5e5'],
        shade: [0.3, '#000'],
        shift: 'top',
        page: {
            html: html
        }, success: function (obj) {
            callback(obj);
        }
    });
}

//limit input length
function limitLength(select, length) {
    if (select.val().length >= length) {
        select.val(select.val().substring(0, length));
    }
}
function canInput(select, length) {
    var _size = select.val().length;
    return length - _size;
}

$(function () {//my jquery code
    //open login panel
    var loginHtml = $('.js-login-panel').html();
    $('.js-login-panel').html("");
    $('.js-login-btn').click(function () {
        myPage('CMS Login', ['420px', '260px'], loginHtml, function (obj) {
            $('.js-login-username').focus();
        });

    });
    //sign in event
    $('.js-body').delegate('.js-signIn-btn', 'click', function () {
        var userName = $('.js-login-username').val().trim();
        var password = $('.js-login-password').val().trim();
        if (userName == "") {
            myMsg("UserName is empty");
        } else if (password == "") {
            myMsg("Password is empty");
        } else {
            $.post("/user/login", {
                userName: userName,
                password: password
            }, function (data) {
                var result = data.success;
                if (result) {//success
                    layer.close(index);
                    window.location = "/";
                }
                myMsg(data.msg);
            }, "json");
        }
    });

    //open register panel
    var registerHtml = $('.js-register-panel').html();
    $('.js-register-panel').html("");
    $('.js-register-btn').click(function () {
        myPage('CMS Register', ['420px', '260px'], registerHtml, function (obj) {
            $('.js-register-username').focus();
        });
    });

    //sign up event
    $('.js-body').delegate('.js-signUp-btn', 'click', function () {
        var userName = $('.js-register-username').val().trim();
        var password = $('.js-register-password').val().trim();
        var password2 = $('.js-register-password2').val().trim();
        if (userName == "") {
            myMsg("UserName is empty");
        } else if (password == "") {
            myMsg("Password is empty");
        } else if (password2 == "") {
            myMsg("Confirm password is empty");
        } else if (password != password2) {
            myMsg("The two passwords don't match");
        } else {
            $.post("/user/reg", {
                userName: userName,
                password: password,
                password2: password2
            }, function (data) {
                var result = data.success;
                var msg = data.msg;
                if (result) {//success
                    layer.close(index);
                }
                myMsg(data.msg);
            }, "json");
        }
    });
    //sign up event
    $('.js-body').delegate('.js-logout-btn', 'click', function () {
        myAlert("Are you sure exit the system", function () {
            window.location = "/user/logout";
        })
    });


    //delete user
    $('.js-user-delete').click(function (e) {
        var $this = $(this);
        var id = $this.attr("data-id");
        $.post("/manager/user/delete", {
            id: id
        }, function (data) {
            if (data.success) {
                $this.parent().parent().fadeOut()
            }
            myMsg(data.msg);
        }, "json");
    });

    //user status
    $(".js-user-status").each(function (i, obj) {
        var status = $(this).attr("data-type");
        if (status == 0) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
        $(this).bootstrapSwitch({size: 'small', onColor: 'success', offColor: 'danger', onText: '启用', offText: '禁用'});
    });
    $(".js-user-status").on('switchChange.bootstrapSwitch', function (event, status) {

        var id = $(this).attr("data-id");
        console.log(status);
        $.post("/manager/user/switch", {
            id: id,
            status: status ? 0 : 1
        }, function (data) {
        }, "json");
    });

    //page
    $('.js-pre-page').click(function () {
        var $this = $(this);
        var page = $this.attr("data-page");
        if (page <= 1) {
            myMsg("this is first page");
            return;
        } else {
            var url = $this.attr("data-url");
            window.location = url + "?page=" + (parseInt(page) - 1);
        }
    });
    $('.js-next-page').click(function () {
        var $this = $(this);
        var page = $this.attr("data-page");
        var totalPage = $this.attr("data-total");
        if (page >= totalPage) {
            myMsg("this is last page");
            return;
        } else {
            var url = $this.attr("data-url");
            window.location = url + "?page=" + (parseInt(page) + 1);
        }
    });

    //pin it
    $(".js-menu-bar").pin({
        containerSelector: ".js-panel-row"
    })
//
//    $(".js-menu-bar").pin({
//        containerSelector: ".js-panel-row"
//    })

    //open add category
    var addCategoryHtml = $('.js-add-category-panel').html();
    $('.js-add-category-panel').html("");
    $('.js-add-category').click(function () {
        myPage('Add Category', ['420px', '200px'], addCategoryHtml, function (obj) {
            $('.js-category-name').focus();
        });
    });
    //add or modify category event
    $('.js-body').delegate('.js-save-category', 'click', function () {
        var name = $('.js-category-name').val().trim();
        var id = $('.js-category-name').attr("data-id");
        if (name == "") {
            myMsg("Category Name is empty");
        } else if (!id) {//add
            $.post("/manager/category/add", {
                name: name
            }, function (data) {
                var result = data.success;
                var msg = data.msg;
                if (result) {//success
                    layer.close(index);
                    window.location = "/manager/category?page=1";
                }
                myMsg(data.msg);
            }, "json");
        } else {//update
            $.post("/manager/category/modify", {
                id: id,
                name: name
            }, function (data) {
                var result = data.success;
                var msg = data.msg;
                if (result) {//success
                    layer.close(index);
                    $('.js-modify-category-current').text(name);
                }
                myMsg(data.msg);
            }, "json");
        }
    });

    //delete category
    $('.js-category-delete').click(function (e) {
        var $this = $(this);
        var id = $this.attr("data-id");
        $.post("/manager/category/delete", {
            id: id
        }, function (data) {
            if (data.success) {
                $this.parent().parent().fadeOut()
            }
            myMsg(data.msg);
        }, "json");
    });
    //modify category
    //open modify category
    $('.js-modify-category').click(function () {
        $('.js-modify-category-current').removeClass("js-modify-category-current");
        var $this = $(this);
        var value = $this.text();
        var id = $this.attr("data-id");
        myPage('Add Category', ['420px', '200px'], addCategoryHtml, function (obj) {
            $('.js-category-name').val(value);
            $('.js-category-name').attr("data-id", id);
            $('.js-category-name').focus();
            $('.js-save-category').text("Save Category Modify");
            $this.addClass("js-modify-category-current");
        });
    });

    //remove class
    $('.js-menu-panel .panel-primary').removeClass("panel-primary");

    $('.js-add-content-name').bind('keyup change  focus blur', function () {
        var $this = $(this);
        var maxlength = parseInt($this.attr("maxlength"), 10);
        if ($this.val().length >= maxlength) {
            limitLength($this, maxlength);
        }
        $('.js-content-name-chars').html(canInput($this, maxlength));
    });


    //save content
    $('.js-save-content ').click(function () {
        var name = $('.js-add-content-name').val().trim();
        var id = $('.js-add-content-name').attr("data-id");
        var content = $('.js-editor').html();
        var category = $('.js-category-value').val();
        if (name === "") {
            myMsg("title is empty");
        } else if (content === "") {
            myMsg("content is empty");
        } else if (!id) {//add
            $.post("/content/add", {
                name: name,
                content: content,
                category: category
            }, function (data) {
                var result = data.success;
                var msg = data.msg;
                myMsg(data.msg);
                if (result) {//success
                    myMsg("success");
                    window.location = "/";
                }
            }, "json");
        } else {//update
            $.post("/content/modify", {
                id: id,
                name: name,
                content: content,
                category: category
            }, function (data) {
                var result = data.success;
                var msg = data.msg;
                myMsg(data.msg);
                if (result) {//success
                    window.location = "/content?page=1";
                }
            }, "json");
        }
    });
    $('.js-content-desc').each(function (i, val) {
        var $this = $(this);
        if ($this.text().length > 150) {
            $this.text($this.text().substring(0, 150) + "...");
        }
        $this.removeClass("hide");
    });

    //delete content
    $('.js-content-delete').click(function (e) {
        var $this = $(this);
        var id = $this.attr("data-id");
        $.post("/manager/content/delete", {
            id: id
        }, function (data) {
            if (data.success) {
                $this.parent().parent().fadeOut()
            }
            myMsg(data.msg);
        }, "json");
    });

});

