$(function(){
    $('#release').click(function(){
        myIframe("发布技术", '0px', '1000px', '655px', 'user/skill.loadAddPage.action');
    });
    $('#skillContent').delegate('#editSkill','click',function(){
		var _id = $(this).attr("data-id");
        myIframe("编辑技术", '0px', '1000px', '655px', 'user/skill.loadEditPage.action?id='+_id);
    });
    //分页浏览
    $('#typeView,#mySkill').click(function(){
        var $this = $(this);
        var _total = $this.attr("data-total");
        var _type = $this.attr("data-type");
        $('#pageScript').load("user/common/paging.jsp", function(){
            resetPage(_total, _type);
        });
        $('#skillContent').load("user/skill.loadList.action?currentPage=1&type=" + _type);
		 $('#pageScript').show();
    });
	$('#skillContent').delegate('#categorySelect','change',function(){
		var _option = $('#skillContent').find("option:selected");;
		var _total = _option.attr("data-total");
        var _type = _option.attr("data-type");
        var _id = _option.val();
        $('#pageScript').load("user/common/paging.jsp", function(){
            resetPage(_total, _type);
        });
        $('#skillContent').load("user/skill.loadList.action?currentPage=1&type=" + _type+"&categoryId="+_id);
		$('#pageScript').show();
	});
    //重置分页组件数据
    function resetPage(total, _type){
        var _count = total;
        _count = parseInt(_count / 10) + (_count % 10 == 0 ? 0 : 1);
        $('#pageScript .pagination').jqPagination({
            link_string: '/?page={page_number}',
            current_page: _count == 0 ? 0 : 1,
            max_page: _count,
            paged: function(page){
                if (_type == "category") {
                    var categoryId = $('#categorySelect').val();
                    $('#skillContent').load("user/skill.loadList.action?currentPage=" + page + "&type=category&categoryId=" + categoryId);
                }
                else {
                    $('#skillContent').load("user/skill.loadList.action?currentPage=" + page + "&type=" + _type);
                }
                document.getElementById('skillContent').scrollIntoView(true);
            }
        });
    }
    //限制字数
    $('#skillTitle,#editTitle').bind("keyup change  focus blur", function(){
        var $this = $(this);
        var maxlength = parseInt($this.attr("maxlength"), 10);
        var select = '#'+$this.attr("id");
        if ($this.val().length >= maxlength) {
            limitLength(select, maxlength);
        }
        $('#number').html(canInput(select, maxlength));
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
			$('#skillTitle').blur();
        }, "json");
    });
    //编辑技术
    $('#editBtn').click(function(){
        var _title = $('#editTitle').val().trim();
        var _content = $('#editor').html();
        var _categoryId = $('#editCategory').val();
		var _id =$('#editId').val();
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
			id:_id
        }, function(data){
            myMsg("保存成功");
        }, "json");
    });
	//单个浏览
	$('#skillContent').delegate('.skill-title','click',function(){
		var _id = $(this).attr("data-id");
		$.get("json/skill.viewSkill.action?id="+_id);
		$('#skillContent').load("user/skill.skillDetial.action?id="+_id);
		 $('#pageScript').hide();
	});
	//评分
	$('#skillContent').delegate('.rating label','click',function(){
		var $this= $(this);
		var _starId = $this.attr("for");
		var _value = $('#'+_starId).val();
		var _id= $('#skillId').val();
		var _status = $('.rating').prop("disabled");
		if(_status==false){
		 $.post("json/skill.graded.action", {
                id: _id,
                grade: _value
            }, function(data){
				$('#skillContent').load("user/skill.skillDetial.action?id="+_id);
		 		$('#pageScript').hide();
            }, "json");
		}else{
			myMsg("你已经评分过了");
		}
		
	});
});
