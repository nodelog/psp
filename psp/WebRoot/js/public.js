$(function(){
    //分页请求公益活动数据
    function pageList(current, async){
        $.ajax({
            url: "json/public.paging.action",
            dataType: "json",
			data:"current="+current,
            async: async,
            success: function(data){
                var list = data.publicInterestList;
                if (list != null) {
                    var _html = "";
                    $.each(list, function(i, obj){
                        var _title = obj.title;
                        var _content = obj.content;
                        if (_content.length > 100) {
                            _content = _content.substr(0, 100) + "...";
                        }
                        var _startTime = obj.startTime.replace("T", " ");
                        _html += "<div class='rows'><div class='title' title='" + _title + "'>" + _title + "</div><div class='pub_content'><img class='img' src='images/7.jpg' title='点击查看详情'/><p>" + _content + "</p><div class='time'>发布时间：" + _startTime + "</div></div></div>";
                    });
                    $('#paging_content').html(_html);
                    
                }
            }
        });
    }
    //加载焦点图资源
    $.ajax({
        url: "json/public.getFacus.action",
        dataType: "json",
        async: false,
        success: function(data){
            var facusPics = data.publicPicList;
            var _html = "";
			var fileServer =$.cookie("FILE_SERVER_URL");
            $.each(facusPics, function(i, obj){
                _html += "<li><a href='javascript:void(0);' target='_blank'><img  src='" + fileServer+obj.url + "'/></a>" +
                "<div class='imgTitle'><a href='javascript:void(0);' target='_blank'>" +
                obj.name +
                "</a></div>" +
                "<div class='showPage'></div></li>";
            });
            $('#foucsBox ul.imgCon').html(_html);
        }
    });
	//加载第一页公益活动
    pageList(1,false);
    var pageTotal = 0;
    
    //获得总页数
    $.ajax({
        url: "json/public.getPageTotal.action",
        dataType: "json",
        async: false,
        success: function(data){
            pageTotal = data.pageTotal;
        }
    });
    //分页插件事件调用
    $('#paging_tool .pagination').jqPagination({
        link_string: '/?page={page_number}',
        max_page: pageTotal,
        paged: function(page){
            document.getElementById('content').scrollIntoView(true);
            loading();
             pageList(page,true);
            loadingEnd();
        }
    });
});
