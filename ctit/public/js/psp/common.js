function domain(){
    var host = window.location.host;
    var url = window.location.href;
    var index = url.indexOf(host) + host.length + 1;
    index = url.indexOf("/", index) + 1;
    url = url.substring(0, index);
    return url;
}

//输入框字数限制
function limitLength(select, length){
    if ($(select).val().length >= length) {
        $(select).val($(select).val().substring(0, length));
    }
}

//还可以输入字数控制显示
function canInput(select, length){
    var _size = $(select).val().length;
    return length - _size;
}

function myAlert(_msg, func){
    var index = $.layer({
         shade:  [0.5, '#333'],
        time: 0,
        title: "公益平台提示",
        closeBtn: [0, true],
        offset: ['300px', '50%'],
        btn: ['确定', '取消'],
        dialog: {
            btns: 2,
            type: -1,
            msg: _msg,
            yes: function(index){
                func();
            },
            no: function(index){
                layer.close(index);
                return false;
            }
        }
    });
}
function sureAlert(_msg, func){
    var index = $.layer({
        shade:  [0.5, '#333'],
        time: 0,
        title: "公益平台提示",
        closeBtn: false,
        offset: ['300px', '50%'],
        btn: ['确定'],
        dialog: {
            btns: 1,
            type: -1,
            msg: _msg,
            yes: function(index){
                func()
            }
        }
    });
}

function myMsg(_msg, index,_height){
	if(typeof(_height) == "undefined"){
		_height='350px';
	}
    $.layer({
        shade: [0],
        time: 2,
        title: false,
        closeBtn: [0, true],
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


function myTips(title, select, type, time){
    var index = layer.tips(title, select, {
        guide: type,
        style: ['background-color:#999; color:#fff', '#999'],
        maxWidth: 150,
        time: time != null ? time : 0
    });
    return index;
}

function myIframe(title, offsetX, areaX, areaY, src){
    var i = $.layer({
		maxmin: true,
        moveOut: false,
        shade: [0],
        type: 2,
        title: title,
        closeBtn: [0, true],
        border: [5, 0.5, '#666', true],
        offset: [offsetX, ''],
        moveType: 1,
        area: [areaX, areaY],
        iframe: {
            src: src
        }
    });
}

function checkEmail(_email){
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
    return reg.test(_email);
}
function exitSystem(){
    $.post("json/user.exit.action", function(data){
		var host = $.cookie("DOMAIN_HOST");
	    location.href = host+"login.jsp";
    }, "json");
}
function adminExit(){
    $.post("adminJson/admin.exit.action", function(data){
		var host = $.cookie("DOMAIN_HOST");
        location.href = host+"admin/login.jsp";
		var host = $.cookie("DOMAIN_HOST");
        location.href = host+"admin/login.jsp";
    }, "json");
}