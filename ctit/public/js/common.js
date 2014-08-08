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
        title: "System Prompt",
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

function loading(){
    index = layer.load("LOADING...");
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

Date.prototype.format=function(fmt) {
    if (fmt == null) {
        fmt = "yyyy-MM-dd hh:mm:ss";
    }
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds()//, //秒
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

$(function () {//my jquery code
     var _ipData = {
        "ip"   : ILData[0],
        "国家" : remote_ip_info.country,
        "省份" : remote_ip_info.province,
        "城市" : remote_ip_info.city,
        "区"   : remote_ip_info.district,
        "ISP"  : remote_ip_info.isp,
        "类型" : remote_ip_info.type,
        "其他" : remote_ip_info.desc 
    };
    console.log(_ipData);
    $.get("/log", {"_ip":_ipData}, function(){});
     


    //open login panel
    var loginHtml = $('.js-login-panel').html();
    $('.js-login-panel').html("");
    $('.js-login-btn').click(function () {
        myPage('Login', ['420px', '260px'], loginHtml, function (obj) {
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
            layer.close(index);
            loading();
            $.post("/user/login", {
                userName: userName,
                password: password
            }, function (data) {
            layer.close(index);
                var result = data.success;
                if (result) {//success
                    location.reload();
                }
                myMsg(data.msg);
            }, "json");
        }
    });

    //open register panel
    var registerHtml = $('.js-register-panel').html();
    $('.js-register-panel').html("");
    $('.js-register-btn').click(function () {
        myPage('Register', ['420px', '260px'], registerHtml, function (obj) {
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
            layer.close(index);
            loading();
            $.post("/user/reg", {
                userName: userName,
                password: password,
                password2: password2
            }, function (data) {
                
                var msg = data.msg;
                layer.close(index);
                
                myMsg(data.msg);
            }, "json");
        }
    });
    //sign up event
    $('.js-body').delegate('.js-logout-btn', 'click', function () {
        myAlert("Are you sure exit the system", function () {
            layer.close(index);
            loading();
            $.get("/user/logout", {}, function (data) {
                layer.close(index);
                location.reload();
            }, "json");
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
$(".js-content-status").each(function (i, obj) {
        var status = $(this).attr("data-type");
        if (status == 0) {
            $(this).prop('checked', true);
        } else if (status == 2) {
            $(this).prop('checked', false);
        }
        $(this).bootstrapSwitch({size: 'small', onColor: 'success', offColor: 'danger', onText: '共享', offText: '私有'});
    });
    $(".js-content-status").on('switchChange.bootstrapSwitch', function (event, status) {

        var id = $(this).attr("data-id");
        console.log(status);
        $.post("/manager/content/share", {
            id: id,
            status: status ? 0 : 2
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
            var _url = $this.attr("data-url");
            window.location = _url + "?page=" + (parseInt(page) - 1);
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
            var _url = $this.attr("data-url");
            window.location = _url + "?page=" + (parseInt(page) + 1);
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


    //save or edit content
    $('.js-save-content ').click(function () {
        if (sessionUser == null) {
            $('.js-login-btn').click();
        } else {
            var name = $('.js-add-content-name').val().trim();
            var oldName = $('.js-add-content-name').attr("data-name");
            var id = $('.js-add-content-name').attr("data-id");
            var content = $('.js-editor').html();
            var category = $('.js-category-value').val();
            if (name === "") {
                myMsg("title is empty");
            } else if (content === "") {
                myMsg("content is empty");
            } else {
                loading();
                $.post("/content/add", {
                    id: id,
                    name: name,
                    content: content,
                    category: category,
                    oldName: oldName
                }, function (data) {
                    layer.close(index);
                    myMsg(data.msg);
                    if (data.success) {//success
                        if (id != null) {
                            window.location = "/content/detail?view=contentDetail&id=" + id;
                        }
                        else {
                            window.location = "/";
                        }
                    }
                }, "json");
            }
        }
    });
    /*$('.js-content-desc').each(function (i, val) {
        var $this = $(this);
        if ($this.text().length > 100) {
            $this.text($this.text().substring(0, 100) + "...");
        }
        $this.removeClass("hide");
		$this.css("max-height","50px");
		$this.css("overflow","auto");
    });*/

    //delete content
    $('.js-content-delete').click(function (e) {
        var $this = $(this);
        var id = $this.attr("data-id");
        loading();
        layer.close(index);
        $.post("/manager/content/delete", {
            id: id
        }, function (data) {
            layer.close(index);
            if (data.success) {
                $this.parent().parent().fadeOut()
            }
            myMsg(data.msg);
        }, "json");
    });
 var url = location.href;
    
    //menu  add category
    $.get("/category/all",
        function (data) {
            var docs = data.docs;
            var html = "";
            var _url = "";
            $.each(docs, function (i, tempDoc) {
                _url = "/content/category?page=1&categoryId=" + tempDoc._id;
                html += '<li><a href="' + _url + '"  class="l-option">' + tempDoc.name + '</a></li>';
            });
            $('.js-category-menu').html(html);
            if (url.indexOf("content/category") != -1) {
                $('.js-category-menu li').each(function(){
                    $this = $(this).children("a:first");
                    if(url.indexOf($this.attr("href"))!=-1){
                        var _html = $this.html();
                        var _length = _html.length;
                        for (var i =0; i<(8-_length)*2;i++) {
                            _html+="&nbsp;";
                        };
                        $('.js-category-menu-name').html(_html);
                        $this.parent().addClass("l-option-current");
                        $this.addClass("l-option-current");
                        return false;
                    }
                });
             }
        }, "json");

    //goto top
    $(window).bind('scroll resize', function () {
        $(".js-goto-top").goToTop();
    });

    //detail
    $('.js-open-comment-btn').click(function () {
        $('.js-comment-input').focus();
    });
    //POST comment
    $('.js-post-comment-btn').click(function () {
        var $this = $(this);
        var id = $this.attr("data-id");
        var comment = $('.js-comment-input').val().trim();
        if (comment == "") {
            myMsg("comment content is empty");
        } else {
            loading();
            layer.close(index);
            $.post("/comment/add", {
                contentId: id,
                comment: comment
            }, function (data) {
                layer.close(index);
                myMsg(data.msg);
                if (data.success) {
                    location.reload();
                }
            }, "json");
        }

    });
    //load more comment
    $('.js-more-comment-btn').click(function () {
        var $this = $(this);
        var page = parseInt($this.attr("data-page"));
        var totalPage = parseInt($this.attr("data-totalPage"));
        var contentId = $this.attr("data-id");
        if (page >= totalPage) {
            myMsg("no more comment");
            return false;
        }
        $.get("/comment/all", {
            cententId: contentId,
            page: page + 1
        }, function (data) {
            var docs = data.docs;
            var html = "";
            page = data.page;
            totalPage = data.totalPage;
            var total = data.total;
            $.each(docs, function (i, val) {
                html += '<a class="list-group-item"><label>' + val.userName + ':&nbsp;</label>';
                html += '<span class="color-gray">' + new Date(val.createTime.toLocaleString()).format() + '</span>';
                html += '<div>' + val.comment + '</div></a>';
            });
            if (totalPage > page) {
                $this.attr("data-page", page);
            } else {
                $('.js-more-comment').addClass("hide");
            }
            $('.js-comment-panel').html($('.js-comment-panel').html() + html);
        }, "json");
    });

    var sessionUser;
    $.ajax({
        url: "/session",
        dataType: "json",
        async: false,
        success: function (data) {
            sessionUser = data.user;
        }
    });
    //check before comment
    $('.js-comment-input').focus(function () {
        if (sessionUser == null) {
            $(this).blur();
            $('.js-login-btn').click();
        }
    });

   
    if (url.indexOf("view=contentDetail") != -1) {
        var docId = $('.js-doc-id').val();
        if (sessionUser != null && sessionUser._id != docId) {
            $('.js-post-comment-btn').prop("disabled", false);
            $('.js-comment-input').attr("placeholder", "please input comment");
        }
        $.get("/comment/all", {
            cententId: docId,
            page: 1
        }, function (data) {
            var docs = data.docs;
            if (docs != null) {
                var html = "";
                var page = data.page;
                var totalPage = data.totalPage;
                var total = data.total;
                $.each(docs, function (i, val) {
                    console.log(val)
                    html += '<a class="list-group-item"><label>' + val.userName + ':&nbsp;</label>';
                    html += '<span class="color-gray">' + new Date(val.createTime.toLocaleString()).format() + '</span>';
                    html += '<div>' + val.comment + '</div></a>';
                });
                var d = new Date();
                var n = d.toLocaleDateString();
                console.log(typeof(n));
                $('.js-comment-title').html($('.js-comment-title').html() + " (" + total + ")");
                if (totalPage > 1) {
                    $('.js-more-comment').removeClass("hide");
                    $('.js-more-comment-btn').attr("data-page", page);
                    $('.js-more-comment-btn').attr("data-totalPage", totalPage);
                    $('.js-more-comment-btn').attr("data-id", docId);
                }
                $('.js-comment-panel').html(html);
            } else {
                $('.js-all-comment').removeClass("hide");
                $('.js-comment-panel').html("");
            }
        }, "json");
    }

    //添加内容（文章）页面
    if (url.indexOf("content/addPage") != -1) {
        $(function () {
            $.get("/category/all",
                function (data) {
                    var docs = data.docs;
                    var options = "";
                    $.each(docs, function (i, tempDoc) {
                        options += '<option class="l-option" value="' + tempDoc._id + '">' + tempDoc.name + '</option>';
                    });
                    $('.js-category-value').html(options);
                }, "json");
        });
        if (sessionUser == null) {
            $('.js-login-btn').click();
        }
    }

    //编辑文章
    if (url.indexOf("view=editContent") != -1) {
        $('.js-editor').html($('.js-content-hide').html());
        $.get("/category/all"
            , function (data) {
                var docs = data.docs;
                var options = "";
                var categoryId = $('.js-edit-content-category').val();
                $.each(docs, function (i, tempDoc) {
                    if (tempDoc._id != categoryId) {
                        options += '<option class="l-option" value="' + tempDoc._id + '">' + tempDoc.name + '</option>';
                    } else {
                        options += '<option value="' + tempDoc._id + '" selected>' + tempDoc.name + '</option>';
                    }
                });
                $('.js-category-value').html(options);
            }, "json");
        if (sessionUser == null) {
            $('.js-login-btn').click();
        }
    }

    //index open login  check
    var loginFlag = $('.js-login-flag').val();
    if (loginFlag == "true") {
        $('.js-login-btn').click();
    }

    //页面刷新
    $('.js-refresh').click(function () {
        location.reload();
    });

    //我的文章
    $('.js-my-content-menu').click(function () {
        if (sessionUser == null) {
            $('.js-login-btn').click();
        } else {
            window.location = '/content/user?page=1';
        }
    });
    //我的评论
    $('.js-my-comment-menu').click(function () {
        if (sessionUser == null) {
            $('.js-login-btn').click();
        } else {
            $.get('/content/user?page=1');
        }
    });

    //修改当前菜单背景
    var current_menu = $('.js-current-menu').val();
    $('.'+current_menu).addClass("current-menu");
   
});//end jquery
  
//一键分享
window._bd_share_config = {
    "common": {
        "bdSnsKey": {},
        "bdText": document.title+"-NODELOG 前端知道-"+location.href,
        "bdMini": "2",
        "bdMiniList": false,
        "bdPic": "",
        "bdStyle": "0",
        "bdSize": "16",
		"bdUrl": location.href
    },
    "slide": {
        "type": "slide",
        "bdImg": "2",
        "bdPos": "right",
        "bdTop": "240"
    }
};
with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = '/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];