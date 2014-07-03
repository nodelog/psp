$(function(){
    //控制问题标题字数
    $('#addProblem .qa_title_text input').bind("keyup change  focus blur", function(){
        var $this = $(this);
        var maxlength = parseInt($this.prop("maxlength"), 10);
        var select = '#addProblem .qa_title_text input';
        if ($this.val.length >= maxlength) {
            limitLength(select, maxlength);
        }
        $('#addProblem span.number').html(canInput(select, maxlength));
    });
    //加载分类
    var category;
    $.post("json/category.loadCategoryByType.action", {
        type: "problem"
    }, function(data){
        category = data.categoryList;
        var _html = "<option value='' disabled selected style='display: none;'>请选择分类</option>";
        $.each(category, function(i, obj){
            _html += "<option value='" + obj.id + "'>" + obj.name + "</option>";
        });
        $('#addProblem select.qa_category').html(_html);
    }, "json");
    //提示弹出层
    var _index;//弹出层索引
    $('#addProblem select.qa_category').hover(function(){
        _index=myTips("请选择正确的分类", '#addProblem select.qa_category', 2);
    }, function(){
        layer.close(_index);
    });
    $('#addProblem select.qa_score').hover(function(){
       _index= myTips("请选择合适的悬赏公益币，让问题尽快解决", '#addProblem select.qa_score', 2);
    }, function(){
        layer.close(_index);
    });
    $('#addProblem a#qa_submit').hover(function(){
       _index= myTips("成功提出一个问题可以获得5公益币", '#addProblem a#qa_submit', 2);
    }, function(){
        layer.close(_index);
    });
//    //弹出层封装方法
//    function myTips(title, select, type){
//        index = layer.tips(title, select, {
//            guide: type,
//            style: ['background-color:#999; color:#fff', '#999'],
//            maxWidth: 150,
//            time: 0
//        });
//    }
//    //msg
//    function myMsg(_msg,index){
//        $.layer({
//            shadeClose: true,
//            time: 2,
//			title : false,
//            closeBtn: [0, true],
//            offset: ['350px', '50%'],
//            dialog: {
//                btns: 0,
//                type: -1,
//                msg: _msg
//            },
//			end:function(){
//				parent.layer.close(index);
//			}
//        });
//    }
    //改变边框样式
    $('#addProblem .qa_title_text input').click(function(){
        var $this = $(this);
        $this.keyup();
        $('#addProblem .qa_title_text').addClass("greenBorder");
    });
    $('#addProblem .qa_title_text input').blur(function(){
        $('#addProblem .qa_title_text').removeClass("greenBorder");
    });
    $('#addProblem .qa_detail_text textarea').click(function(){
        var $this = $(this);
        $this.keyup();
        $('#addProblem .qa_detail_text').addClass("greenBorder");
    });
    $('#addProblem .qa_detail_text textarea').blur(function(){
        $('#addProblem .qa_detail_text').removeClass("greenBorder");
    });
    
    //提交问题
    var _imageId;
    $('#qa_submit').click(function(){
        var _title = $('.qa_title_text input').val();
        var _category = $('.qa_category').val();
        if (_title.trim() == "") {
            myMsg("请输入问题描述");
            $('.qa_title_text input').focus();
            return;
        }
        if (_category == null || _category == "") {
            myMsg("请选择问题分类");
            return;
        }
        var _content = $('.qa_detail_text textarea').val();
        var _score = $('.qa_score').val();
        $.post("json/problem.addProblem.action", {
            title: _title,
            content: _content,
            score: _score,
            categoryId: _category,
            imageId: _imageId
        }, function(data){
            var i = parent.layer.getFrameIndex(window.name);
　　			myMsg("问题发布成功",i);
			$('.qa_title_text input').val("");
			 $('.qa_detail_text textarea').val("");
			$('.qa_score').val(0);
			$('#addProblem .qa_title_text input').blur();
        }, "json");
    });
    //上传文件
    $('#file_upload').uploadify({
        auto: true,
        buttonText: "添加图片",
        flash_url: "images/uploadify.swf",
        uploader: "../../json/problem.upload.action",
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
            var _html = "<img src='" + _imageUrl + "' width='50px' height='50px'/>"
            $('#file_upload-queue').html(_html);
        }
    });
	$('#file_upload').hover(function(){
        _index=myTips("支持jpeg、gif、png和bmp格式的图片", '#file_upload',1);
    }, function(){
        layer.close(_index);
    });
});
