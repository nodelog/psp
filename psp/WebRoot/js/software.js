$(function(){
    $('#softwareResource,#mySoftware,#shareSoftware').delegate('a', 'click', function(){
        var $this = $(this);
        if (!$this.hasClass("currentActive")) {
            $('.currentActive').removeClass('currentActive');
            $this.addClass('currentActive');
        }
        //上传软件
        if ($this.hasClass("upload-software")) {
            var height = $('#software').css("height");
            if ($('#upload-div').css("display") == "none") {
                $('#upload-div').css("margin-top", "-" + height);
            }
            $('#upload-div').fadeToggle();
            return;
        }
        $('#upload-div').fadeOut();
        //分享链接
        if ($this.hasClass("share-link")) {
            $('#paging').removeClass("show");
            $('#rightColumn').load("user/software.loadShareLink.action");
            return;
        }
        //列表显示
        $('#paging').load("user/common/paging.jsp", function(){
            resetPage();
            $('#paging').addClass("show");
        });
        var categoryId = $('.currentActive').attr("data-id");
        var type = $('.currentActive').attr("data-type");
        $('#rightColumn').load("user/software.loadList.action?currentPage=1&categoryId=" + categoryId + "&type=" + type);
    });
    
    var _imageId;
    $('#uploadFile').click(function(){
        if ($('#softwareFile-queue').html().trim() == "") {
            myMsg("请选择软件文件");
            return;
        }
        if ($('#softwareName').val().trim() == "") {
            myMsg("请输入软件名称");
            return;
        }
        if ($('#softwareProtocol').prop("checked") == false) {
            myMsg("请勾选同意上传协议");
            return;
        }
        $('#softwareFile').uploadify('upload');
    });
    $('#softwareFile').uploadify({
        auto: false,
        buttonText: "选择文件",
        flash_url: "images/uploadify.swf",
        uploader: "json/software.uploadSoftware.action",
        fileObjName: "softwareFile",
        multi: false,
        uploadLimit: 0,
        removeCompleted: false,
        requeueErrors: true,
        width: 100,
        height: 30,
        onUploadSuccess: function(file, data, response){
            $('#softwareImage-queue').html("");
            $('#softwareFile-queue').html("");
            $('#softwareFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#softwareImage').uploadify('disable', false);
            $('#softwareName').prop("disabled", false);
            $('#softwareName').val("");
            $('#introduction').val("");
            $('#softwareName').blur();
            $('#introduction').blur();
            $('#successList').append("<li>" + file.name + " - 上传完成</li>");
            var _badge = $('#successList li').length;
            $('#shareSoftware .upload-software .badge').html(_badge > 0 ? _badge : "");
        },
        onUploadComplete: function(file){
            $('#softwareImage-queue').html("");
            $('#softwareFile-queue').html("");
            $('#softwareFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#softwareImage').uploadify('disable', false);
            $('#softwareName').prop("disabled", false);
            $('#softwareName').val("");
			$('#introduction').val("");
            $('#softwareName').blur();
            $('#introduction').blur();
        },
        onUploadStart: function(file){
        
            $('#softwareImage').uploadify('disable', true);
            $('#softwareName').prop("disabled", true);
            $('#uploadFile').prop("disabled", true);
            $("#softwareFile").uploadify("settings", "formData", {
                imageId: _imageId,
                name: $('#softwareName').val().trim(),
                introduction: $('#introduction').val().trim(),
                categoryId: $('#softwareCategory').val()
            });
            
        },
        onCancel: function(file){
            $('#softwareFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#softwareImage').uploadify('disable', false);
            $('#softwareName').prop("disabled", false);
            $('#softwareName').val("");
            $('#softwareName').blur();
        },
        onSelect: function(file){
            $('#softwareFile').uploadify('disable', true);
            $('#softwareName').val(file.name);
            $('#softwareName').focus();
        }
    });
    $('#softwareImage').uploadify({
        auto: true,
        buttonText: "添加预览图",
        flash_url: "images/uploadify.swf",
        uploader: "json/software.uploadImage.action",
        fileObjName: "softwareImage",
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
            $('#softwareImage-queue').html(_html);
        }
    });
    //分享链接
    $('#rightColumn').delegate('#shareLink', 'click', function(){
        if ($('#linkName').val().trim() == "") {
            myMsg("请输入链接名称");
            return;
        }
        if ($('#linkUrl').val().trim() == "") {
            myMsg("请输入链接地址");
            return;
        }
        var _linkName = $('#linkName').val().trim();
        var _linkUrl = $('#linkUrl').val().trim();
        var _linkDesc = $('#linkDesc').val();
        var _categoryId = $('#linkCategory').val().trim();
        $.post("json/software.shareLink.action", {
            name: _linkName,
            url: _linkUrl,
            introduction: _linkDesc,
            categoryId: _categoryId
        }, function(data){
            myMsg("分享成功");
            $('#linkName').val("");
            $('#linkUrl').val("");
            $('#linkDesc').val("");
            $('#linkName').blur();
            $('#linkUrl').blur();
            $('#linkDesc').blur();
        }, "json");
    });
    
    //分页插件初始化
    function resetPage(){
        var _count = $('.currentActive').attr("data-total");
        _count = parseInt(_count / 10) + (_count % 10 == 0 ? 0 : 1);
		var categoryId = $('.currentActive').attr("data-id");
        var type = $('.currentActive').attr("data-type");
        $('#paging .pagination').jqPagination({
            link_string: '/?page={page_number}',
            current_page: _count == 0 ? 0 : 1,
            max_page: _count,
            paged: function(page){
                var categoryId = $('.currentActive').attr("data-id");
                var type = $('.currentActive').attr("data-type");
                $('#rightColumn').load("user/software.loadList.action?currentPage="+page+"&categoryId=" + categoryId + "&type=" + type);
                document.getElementById('software').scrollIntoView(true);
            }
        });
    }
    //下载
    $('#rightColumn').delegate('button.download,button.open-link', 'click', function(){
        var _ftp = $.cookie("FTP_SERVER_HOST");
        var $this = $(this);
        var _url = $this.attr("data-url");
        var _resourceId = $this.attr("data-id");
        var _categoryId = $this.attr("data-type");
        if ($this.hasClass("download")) {
            $.post("json/download.addDownload.action", {
                resource: _resourceId,
                categoryId: _categoryId
            }, function(data){
            }, "json");
            window.open(_ftp + _url, '下载文件');
        }
        else {
            window.open(_url, '下载文件');
        }
    });
    //输入框字数限制
    $('#rightColumn,#upload-div').delegate("#linkName,#linkUrl,#linkDesc,#softwareName,#introduction", 'keyup change focus blur', function(){
        var $this = $(this);
        var maxlength = parseInt($this.prop("maxlength"), 10);
        var select = '#' + $this.attr("id");
        if ($this.val().length >= maxlength) {
            limitLength(select, maxlength);
        }
        $this.next().find('.number').html(canInput(select, maxlength));
    });
    //软件详情
    $('#rightColumn').delegate('.software-detail', 'click', function(){
        var id = $(this).attr("data-id");
        $.get("json/software.viewSoftware.action?id=" + id);
        $('#rightColumn').load("user/software.loadDetail.action?id=" + id, function(){
        });
        $('#paging').removeClass("show");
    });
    //评分
    $('#rightColumn').delegate('.rating label', 'click', function(){
        var $this = $(this);
        var _starId = $this.attr("for");
        var _value = $('#' + _starId).val();
        var _id = $('#softwareId').val();
        var _status = $('.rating').prop("disabled");
        if (_status == false) {
            $.post("json/software.graded.action", {
                id: _id,
                grade: _value
            }, function(data){
                $('#rightColumn').load("user/software.loadDetail.action?id=" + _id);
                $('#paging').removeClass("show");
            }, "json");
        }
        else {
            myMsg("你已经评分过了");
        }
        
    });
});
