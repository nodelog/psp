$(function(){
    $('#meidaResource,#documentResource,#softwareResource').delegate('a', 'click', function(){
        var $this = $(this);
        if (!$this.hasClass("currentResource")) {
            $('.currentResource').removeClass('currentResource');
            $this.addClass('currentResource');
        }
        var categoryId = $('.currentResource').attr("data-id");
        $('#pageScript').load("user/common/paging.jsp", function(){
            resetPage();
        });
        $('#resourceList').load("user/download.loadList.action?currentPage=1&categoryId=" + categoryId);
    });
    //历史下载
    $('#downloadHistory').delegate('a', 'click', function(){
        var $this = $(this);
        if (!$this.hasClass("currentResource")) {
            $('.currentResource').removeClass('currentResource');
            $this.addClass('currentResource');
        }
        var categoryId = $('.currentResource').attr("data-id");
        $('#pageScript').load("user/common/paging.jsp", function(){
            resetPage();
        });
        $('#resourceList').load("user/download.loadList.action?currentPage=1&categoryId=" + categoryId);
        document.getElementById('resourceList').scrollIntoView(true);
    });
    
    function resetPage(){
        var _count = $('.currentResource').attr("data-total");
        _count = parseInt(_count / 10) + (_count % 10 == 0 ? 0 : 1);
        $('#rightColumn .pagination').jqPagination({
            link_string: '/?page={page_number}',
            current_page: _count == 0 ? 0 : 1,
            max_page: _count,
            paged: function(page){
                var categoryId = $('.currentResource').attr("data-id");
                $('#resourceList').load("user/download.loadList.action?currentPage=" + page + "&categoryId=" + categoryId);
                document.getElementById('resourceList').scrollIntoView(true);
            }
        });
    }
    //下载
    $('#resourceList').delegate('a.download', 'click', function(){
//        var _ftp = $.cookie("FTP_SERVER_HOST");
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
//	    window.open(_url, '下载文件');
    });
});
