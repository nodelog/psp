$(function(){
    $('#header .myCount ul').delegate('li.un_active', 'mouseover click', function(){
        var $this = $(this);
        $this.removeClass("un_active");
        $this.parent().children(".active").removeClass("active").addClass("un_active");
        $this.addClass("active");
        $('#header .myUpload').toggle();
        $('#header .myDown').toggle();
    });
    $('#film .film-head ul').delegate('li.allFilm,li.myFilm', 'click', function(){
        $('.player-div').hide(500);
        $('.upload-div').fadeOut(500);
        var $this = $(this);
        var _class;
        if ($this.hasClass("active")) {
            if ($this.hasClass("allFilm")) {
                $('#filmPanel').load("user/media.listpaging.action?scope=film&currentPage=1");
            }
            else 
                if ($this.hasClass("myFilm")) {
                    $('#myFilmPanel').load("user/media.listpagingByUser.action?scope=userFilm&currentPage=1");
                }
            return;
        }
        else {
            $('#film .film-head ul li.active').removeClass("active");
            $this.addClass("active");
            $('#film .film-panel.active').removeClass("active");
            if ($this.hasClass("allFilm")) {
                _class = "allFilm";
                $('#filmPanel').load("user/media.listpaging.action?scope=film&currentPage=1");
            }
            else {
                _class = "myFilm";
                $('#myFilmPanel').load("user/media.listpagingByUser.action?scope=userFilm&currentPage=1");
            }
            $('#film .film-panel.' + _class).addClass("active");
        }
    });
    $('#music .music-head ul').delegate('li.allMusic,li.myMusic', 'click', function(){
        var $this = $(this);
        var _class;
        if ($this.hasClass("active")) {
            if ($this.hasClass("allMusic")) {
                $('#musicPanel').load("user/media.listpaging.action?scope=music&currentPage=1");
            }
            else 
                if ($this.hasClass("myMusic")) {
                    $('#myMusicPanel').load("user/media.listpagingByUser.action?scope=userMusic&currentPage=1");
                }
            return;
        }
        else {
            $('#music .music-head ul li.active').removeClass("active");
            $this.addClass("active");
            $('#music .music-panel.active').removeClass("active");
            if ($this.hasClass("allMusic")) {
                _class = "allMusic";
                $('#musicPanel').load("user/media.listpaging.action?scope=music&currentPage=1");
            }
            else {
                _class = "myMusic";
                $('#myMusicPanel').load("user/media.listpagingByUser.action?scope=userMusic&currentPage=1");
            }
            $('#music .music-panel.' + _class).addClass("active");
        }
    });
    //上传视频按钮--显示/隐藏上传层
    $('#film .upload').delegate('button.btn-success', 'click', function(){
        $('.player-div').hide(500);
        $('#film .upload-div').fadeToggle(500);
        var _span = $(this).find('span.glyphicon');
        if (_span.hasClass('glyphicon-chevron-down')) {
            _span.addClass('glyphicon-chevron-up');
            _span.removeClass('glyphicon-chevron-down');
        }
        else {
            _span.addClass('glyphicon-chevron-down');
            _span.removeClass('glyphicon-chevron-up');
        }
    });
    //上传音乐按钮
    $('#music .upload').delegate('button.btn-info', 'click', function(){
        $('.music-upload').fadeToggle(500);
        var _span = $(this).find('span.glyphicon');
        if (_span.hasClass('glyphicon-chevron-down')) {
            _span.addClass('glyphicon-chevron-up');
            _span.removeClass('glyphicon-chevron-down');
        }
        else {
            _span.addClass('glyphicon-chevron-down');
            _span.removeClass('glyphicon-chevron-up');
        }
    });
    $('#player,.player-div .panel-heading .glyphicon-minus').click(function(){
        $('.upload-div').fadeOut(500);
        $('.player-div').toggle(500);
    });
    $('#musicPlayer,.music-player .panel-heading .glyphicon-minus').click(function(){
        $('.music-player').toggle(500);
        $('#music li.current').toggle(500);
    });
    var _imageId;
    $('#filmFile').uploadify({
        auto: false,
        buttonText: "选择视频",
        flash_url: "images/uploadify.swf",
        uploader: "json/media.uploadFilm.action",
        fileObjName: "film",
        fileTypeDesc: "视频文件",
        fileTypeExts: "*.mp4;*.webm;*.ogg;*.avi;*.3gp;*.rmvb;*.wmv;*.mkv;*.mpg;*.vob;*.mov;*.flv;*.swf",
        multi: false,
        uploadLimit: 0,
        removeCompleted: false,
        requeueErrors: true,
        width: 100,
        height: 30,
        onUploadSuccess: function(file, data, response){
            $('#fileImg-queue').html("");
            $('#filmFile-queue').html("");
            $('#filmFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#fileImg').uploadify('disable', false);
            $('#filmName').prop("disabled", false);
            $('#filmName').val("");
			$('#filmName').blur();
            $('#successList').append("<li>" + file.name + " - 上传完成</li>");
            var _badge = $('#successList li').length;
            $('#film .upload .badge').html(_badge > 0 ? _badge : "");
        },
        onUploadComplete: function(file){
            $('#fileImg-queue').html("");
            $('#filmFile-queue').html("");
            $('#filmFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#fileImg').uploadify('disable', false);
            $('#filmName').prop("disabled", false);
            $('#filmName').val("");
			$('#filmName').blur();
        },
        onUploadStart: function(file){
            $('#fileImg').uploadify('disable', true);
            $('#filmName').prop("disabled", true);
            $('#uploadFile').prop("disabled", true);
            $("#filmFile").uploadify("settings", "formData", {
                imageId: _imageId,
                name: $('#filmName').val()
            });
        },
        onCancel: function(file){
            $('#filmFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#fileImg').uploadify('disable', false);
            $('#filmName').prop("disabled", false);
            $('#filmName').val("");
            $('#filmName').blur();
        },
        onSelect: function(file){
            $('#filmFile').uploadify('disable', true);
            $('#filmName').val(file.name);
            $('#filmName').focus();
        }
    });
    $('#fileImg').uploadify({
        auto: true,
        buttonText: "添加预览图",
        flash_url: "images/uploadify.swf",
        uploader: "json/media.uploadImage.action",
        fileObjName: "image",
        fileTypeDesc: "图片文件",
        fileTypeExts: "*.jpg;*.gif;*.png;*.bmp;*.tif;*.pcx;*.tga;*.ico",
        multi: false,
        uploadLimit: 0,
        removeCompleted: false,
        requeueErrors: true,
        width: 100,
        height: 30,
        onUploadSuccess: function(file, data, response){
            var dataObj = eval("(" + data + ")");
            var fileServer = $.cookie("FILE_SERVER_URL");
            var url = dataObj.imageFile.url;
            _imageId = dataObj.imageFile.id;
            var _imageUrl = fileServer + url;
            var _html = "<img src='" + _imageUrl + "' width='100px' height='100px'/>"
            $('#fileImg-queue').html(_html);
        }
    });
    var index;
    $('#fileImg').hover(function(){
        index = myTips("添加预览图可以在播放前预览", '#fileImg', 1);
    }, function(){
        layer.close(index);
    });
    $('#uploadFile').click(function(){
        if ($('#filmFile-queue').html().trim() == "") {
            myMsg("请选择视频文件");
            return;
        }
        if ($('#filmProtocol').prop("checked") == false) {
            myMsg("请勾选同意上传协议");
            return;
        }
        $('#filmFile').uploadify('upload');
    });
    //播放器
    
    //播放
    $('#filmPanel,#myFilmPanel,.foucs_view').delegate('.caption a.btn-success,.imgCon img.pic-film', 'click', function(){
        var domain = $.cookie("FILE_SERVER_URL");
        var $this = $(this);
        var _url = $this.attr('data-url');
        var ftp_url = $this.attr('ftp-url');
		console.log(_url);
        var _resourceId = $this.attr("data-id");
        var _categoryId = $this.attr("data-type");
        var _image = domain + $(this).attr('data-image');
        $('#filmePlayer source').attr("src",domain+ _url);
        $('#filmePlayer').attr("poster", _image);
        var _name = $(this).attr('data-name');
        $('.player-div .panel-footer span.current').html("当前播放：" + _name);
        $('.player-div .panel-footer a').attr("href", ftp_url);
        $('.player-div .panel-footer a').attr("data-url", ftp_url);
        $('.player-div .panel-footer a').attr("data-id", _resourceId);
        $('.player-div .panel-footer a').attr("data-type", _categoryId);
        $('.player-div .panel-footer a').removeAttr("disabled");
        var player = new MediaElementPlayer('#filmePlayer', {
            startVolume: 0.5
        });
        $('.upload-div').fadeOut(500);
        $('.player-div').animate({
            width: 'show'
        });
        player.pause();
        player.setSrc(domain+_url);
        player.play();
        document.getElementById('film').scrollIntoView(true);
    });
    //音乐播放
    $('#musicPanel,#myMusicPanel').delegate('span.glyphicon-headphones', 'click', function(){
        var domain = $.cookie("FILE_SERVER_URL");
        var _url = $(this).attr('data-url');
        $('#audio').attr("src", domain + _url);
        var _name = $(this).attr('data-name');
        var _minName = _name.substring(0, 17);
        $('#music .music-head ul li span.current').html("播放：" + _minName);
        $('#music .music-head ul li span.current').attr("title", _name);
        var player = new MediaElementPlayer('audio', {
            startVolume: 0.5
        });
        $('.music-player').animate({
            width: 'show'
        });
        $('#music li.current').animate({
            width: 'show'
        });
        player.pause();
        player.setSrc(domain + _url);
        player.play();
        document.getElementById('music').scrollIntoView(true);
    });
    //下载
    $('#filmPanel,#myFilmPanel').delegate('.caption .btn-default', 'click', function(){
//        var _ftp = $.cookie("FTP_SERVER_HOST");
        var $this = $(this);
        var _url =$this.attr('data-url');
        var _resourceId = $this.attr("data-id");
        var _categoryId = $this.attr("data-type");
        $.post("json/download.addDownload.action", {
            resource: _resourceId,
            categoryId: _categoryId
        }, function(data){
        }, "json");
		return true;
//        window.open(_url, '下载文件');
    });
    $('.player-div .panel-footer a').click(function(){
//        var _ftp = $.cookie("FTP_SERVER_HOST");
        var $this = $(this);
        var _url = $this.attr('data-url');
        if (_url != "") {
            var _resourceId = $this.attr("data-id");
            var _categoryId = $this.attr("data-type");
            $.post("json/download.addDownload.action", {
                resource: _resourceId,
                categoryId: _categoryId
            }, function(data){
            }, "json");
			return true;
//            window.open(_ftp + _url, '下载文件');
        }
    });
    //上传音乐
    $('#musicFile').uploadify({
        auto: false,
        buttonText: "选择音乐",
        flash_url: "images/uploadify.swf",
        uploader: "json/media.uploadMusic.action",
        fileObjName: "music",
        fileTypeDesc: "音频文件",
        fileTypeExts: "*.mp3;*.wav;*.wma;*.ape;*.fla;*.aac;*.mmf;*.amr;*.m4a;*.m4r;*.ogg;*.wv;*.mp4;*.mpa",
        multi: false,
        uploadLimit: 0,
        removeCompleted: false,
        requeueErrors: true,
        width: 100,
        height: 30,
        onUploadSuccess: function(file, data, response){
            $('#musicFile-queue').html("");
            $('#musicFile').uploadify('disable', false);
            $('#uploadMusicFile').prop("disabled", false);
            $('#musicName').prop("disabled", false);
            $('#musicName').val("");
            $('#musicName').blur();
            $('#successMusicList').append("<li>" + file.name + " - 上传完成</li>");
            var _badge = $('#successMusicList li').length;
            $('#music .upload .badge').html(_badge > 0 ? _badge : "");
        },
        onUploadComplete: function(file){
            $('#musicFile-queue').html("");
            $('#musicFile').uploadify('disable', false);
            $('#uploadMusicFile').prop("disabled", false);
            $('#musicName').prop("disabled", false);
            $('#musicName').val("");
			$('#musicName').blur();
        },
        onUploadStart: function(file){
            $('#uploadMusicFile').prop("disabled", true);
            $('#musicName').prop("disabled", true);
            $("#musicFile").uploadify("settings", "formData", {
                name: $('#musicName').val()
            });
        },
        onCancel: function(file){
            $('#musicFile').uploadify('disable', false);
            $('#uploadMusicFile').prop("disabled", false);
            $('#musicName').prop("disabled", false);
            $('#musicName').val("");
            $('#musicName').blur();
        },
        onSelect: function(file){
            $('#musicFile').uploadify('disable', true);
            $('#musicName').val(file.name);
            $('#musicName').focus();
        }
    });
    $('#uploadMusicFile').click(function(){
        if ($('#musicFile-queue').html().trim() == "") {
            myMsg("请选择音乐");
            return;
        }
        if ($('#musicProtocol').prop("checked") == false) {
            myMsg("请勾选同意上传协议");
            return;
        }
        $('#musicFile').uploadify('upload');
    });
    //下载
    $('#musicPanel,#myMusicPanel').delegate('.music_download', 'click', function(){
//        var _ftp = $.cookie("FTP_SERVER_HOST");
        var $this = $(this);
        var _url =$this.attr('data-url');
        var _resourceId = $this.attr("data-id");
        var _categoryId = $this.attr("data-type");
        $.post("json/download.addDownload.action", {
            resource: _resourceId,
            categoryId: _categoryId
        }, function(data){
        }, "json");
		return true;
//        window.open(_url, '下载文件');
    });
    //输入框字数限制
    $('#filmName,#musicName').bind("keyup change focus blur", function(){
        var $this = $(this);
        var maxlength = parseInt($this.prop("maxlength"), 10);
        var select = '#' + $this.attr("id");
        if ($this.val.length >= maxlength) {
            limitLength(select, maxlength);
        }
        if (select == "#filmName") {
            $('#film .upload-div .number').html(canInput(select, maxlength));
        }
        else {
            $('.music-upload .number').html(canInput(select, maxlength));
        }
    });
    //刷新在线人数;
    $('#refeshOnline').click(function(){
		 loading();
        $.post("json/user.countOnline.action", function(data){
            $('#onlineCount').html(data.onlineCount);
			 loadingEnd();
        }, "json");
    });
});
