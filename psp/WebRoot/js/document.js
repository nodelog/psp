$(function(){
    $('#uploadDocument').click(function(){
        myIframe("上传文档", '100px', '600px', '450px', 'user/document.loadAddPage.action');
    });
    //分页浏览
    $('#typeView,#myDocument').click(function(){
        var $this = $(this);
        var _total = $this.attr("data-total");
        var _type = $this.attr("data-type");
        $('#pageScript').load("user/common/paging.jsp", function(){
            resetPage(_total, _type);
        });
        $('#documentContent').load("user/document.loadList.action?currentPage=1&type=" + _type);
        $('#pageScript').show();
    });
	//分类浏览
    $('#documentContent').delegate('#categorySelect', 'change', function(){
        var _option = $('#documentContent').find("option:selected");
        var _total = _option.attr("data-total");
        var _type = _option.attr("data-type");
        var _id = _option.val();
        $('#pageScript').load("user/common/paging.jsp", function(){
            resetPage(_total, _type);
        });
        $('#documentContent').load("user/document.loadList.action?currentPage=1&type=" + _type + "&categoryId=" + _id);
        $('#pageScript').show();
    });
    //重置分页组件数据
    function resetPage(total, type){
        var _count = total;
        _count = parseInt(_count / 10) + (_count % 10 == 0 ? 0 : 1);
        $('#pageScript .pagination').jqPagination({
            link_string: '/?page={page_number}',
            current_page: _count == 0 ? 0 : 1,
            max_page: _count,
            paged: function(page){
                if (type == "category") {
                    var categoryId = $('#categorySelect').val();
                    $('#documentContent').load("user/document.loadList.action?currentPage=" + page + "&type=category&categoryId=" + categoryId);
                }
                else {
                    $('#documentContent').load("user/document.loadList.action?currentPage=" + page + "&type=" + type);
                }
                document.getElementById('documentContent').scrollIntoView(true);
            }
        });
    }
    //限制字数
    $('#documentName').bind("keyup change focus blur", function(){
        var $this = $(this);
        var maxlength = parseInt($this.attr("maxlength"), 10);
        var select = '#' + $this.attr("id");
        if ($this.val().length >= maxlength) {
            limitLength(select, maxlength);
        }
        $this.next().find('.number').html(canInput(select, maxlength));
    });
    //发布技术
    $('#releaseBtn').click(function(){
        var _title = $('#skillTitle').val().trim();
        var _content = $('#editor').html();
        var _categoryId = $('#skillCategory').val();
        if (_title == "") {
            myMsg("请输入标题");
            return;
        }
        if (_content == "") {
            myMsg("请输入内容");
            return;
        }
        $.post("json/skill.save.action", {
            title: _title,
            content: _content,
            categoryId: _categoryId
        }, function(data){
            myMsg("发布成功");
            $('#skillTitle').val("");
            $('#editor').html("");
            $('#skillCategory option:first').prop("selected", true);
        }, "json");
    });
    //编辑技术
    $('#editBtn').click(function(){
        var _title = $('#editTitle').val().trim();
        var _content = $('#editor').html();
        var _categoryId = $('#editCategory').val();
        var _id = $('#editId').val();
        if (_title == "") {
            myMsg("请输入标题");
            return;
        }
        if (_content == "") {
            myMsg("请输入内容");
            return;
        }
        $.post("json/skill.edit.action", {
            title: _title,
            content: _content,
            categoryId: _categoryId,
            id: _id
        }, function(data){
            myMsg("保存成功");
        }, "json");
    });
    //单个浏览
    $('#documentContent').delegate('.document-title', 'click', function(){
        var _id = $(this).attr("data-id");
        $.get("json/document.viewDocument.action?id=" + _id);
        var _flex = $.cookie("FLEX_SERVER_URL");
        var _url = $(this).attr("data-url").replace("document/", "");
		var _name = $(this).html().trim();
        myIframe("文档查看器 ("+_name+")", '0px', '1300px', '655px', _flex + "?doc=" + _url);
    });
    //评分
    $('#documentContent').delegate('.rating label', 'click', function(){
        var $this = $(this);
        var _starId = $this.attr("for");
        var _value = $('#' + _starId).val();
        var _id = $('#skillId').val();
        var _status = $('.rating').prop("disabled");
        if (_status == false) {
            $.post("json/skill.graded.action", {
                id: _id,
                grade: _value
            }, function(data){
                //				$('#documentContent').load("user/skill.skillDetial.action?id="+_id);
                //		 		$('#pageScript').hide();
            }, "json");
        }
        else {
            myMsg("你已经评分过了");
        }
    });
    //上传文档
    $('#documentFile').uploadify({
        auto: false,
        buttonText: "选择文件",
        flash_url: "images/uploadify.swf",
        uploader: "../json/document.uploadDocument.action",
        fileObjName: "documentFile",
        fileTypeDesc: "PDF 文件",
        fileTypeExts: "*.pdf",
        multi: false,
        uploadLimit: 0,
        removeCompleted: false,
        requeueErrors: true,
        width: 100,
        height: 30,
        onUploadSuccess: function(file, data, response){
            $('#documentFile-queue').html("");
            $('#documentFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#documentName').prop("disabled", false);
            $('#documentName').val("");
			$('#documentName').blur();
            $('#successList').append("<li>" + file.name + " - 上传完成</li>");
            
        },
        onUploadComplete: function(file){
            $('#documentFile-queue').html("");
            $('#documentFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#documentName').prop("disabled", false);
            $('#documentName').val("");
			$('#documentName').blur();
        },
        onUploadStart: function(file){
            $('#documentName').prop("disabled", true);
            $('#uploadFile').prop("disabled", true);
            $("#documentFile").uploadify("settings", "formData", {
                name: $('#documentName').val().trim(),
                categoryId: $('#documentCategory').val()
            });
        },
        onCancel: function(file){
            $('#documentFile').uploadify('disable', false);
            $('#uploadFile').prop("disabled", false);
            $('#documentName').prop("disabled", false);
            $('#documentName').val("");
            $('#documentName').blur();
        },
        onSelect: function(file){
            $('#documentFile').uploadify('disable', true);
            $('#documentName').val(file.name);
            $('#documentName').focus();
        }
    });
    $('#uploadFile').click(function(){
        if ($('#documentFile-queue').html().trim() == "") {
            myMsg("请选择文档");
            return;
        }
        if ($('#documentName').val().trim() == "") {
            myMsg("请输入文档名称");
            return;
        }
        if ($('#protocol').prop("checked") == false) {
            myMsg("请勾选同意上传协议");
            return;
        }
        $('#documentFile').uploadify('upload');
    });
    var _index;
    $('#documentFile').hover(function(){
        _index = myTips("只支持 PDF 格式的文档", '#documentFile', 1);
    }, function(){
        layer.close(_index);
    });
    $('#documentContent').delegate('.document-download', 'click', function(){
        var $this = $(this);
        var _url = $this.attr("data-url");
        var _resourceId = $this.attr("data-id");
        var _categoryId = $this.attr("data-type");
        $.post("json/download.addDownload.action", {
            resource: _resourceId,
            categoryId: _categoryId
        }, function(data){
        }, "json");
		return true;
    });
});
