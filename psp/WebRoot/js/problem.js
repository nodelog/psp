
$(function(){
    //获得图片类问题
    var picProblem = new Array();
    $.post("json/problem.loadHotPic.action", function(data){
        var list = data.problemPicList;
        if (list.length > 0) {
            $.each(list, function(i, obj){
                if (obj != null) {
                    picProblem[i] = obj;
                }
            });
            fullPic(0);
        }
    }, "json");
    
    //获得热门问题
    var hotProblem = new Array();
    $.post("json/problem.loadHotProblem.action", function(data){
        var list = data.hotProblem;
        if (list.length > 0) {
            $.each(list, function(i, obj){
                if (obj != null) 
                    hotProblem[i] = obj;
            });
            var problem = hotProblem[0];
            
            fullHtml(problem);
            $('#hot_button li').each(function(i, element){
				var _title = hotProblem[i].title;
				if(_title.length>12){
					_title = _title.substr(0,11)+"...";
				}
                $(element).html(_title);
            });
        }
    }, "json");
    //获得最新问题
    function getNewProblem(){
        $.post("json/problem.loadNewProblem.action", function(data){
            var list = data.newProblem;
            fullProblem(list);
        }, "json");
    }
    getNewProblem();
    $('#type_content .new_view').click(function(){
        getNewProblem();
        tabSwitch("new_view");
    });
    $('#type_content .type_view').click(function(){
        $('#type_name .type_detail ul li.type_current').click();
        tabSwitch("type_view");
    });
    
    //填充问题
    function fullProblem(list, tab){
        var _html = "";
        $.each(list, function(i, obj){
            var _scoreHtml = "";
            if (obj.score != null && obj.score != 0) {
                _scoreHtml = "<span class='score'>" + obj.score + "</span>";
            }
            var _titleHtml = "<a class='qa_title problem_detail' data-id='" + obj.id + "' title='" + obj.title + "'>" + obj.title + "</a>";
            var answers = obj.answers;
            var size = 0;
            $.each(answers, function(i, obj){
                if (obj != null) {
                    size++;
                }
            });
            var _sizeHtml = "<span class='answer_count'>" + size + "回答</span>";
            _html += "<dl><dt>" + _scoreHtml + _titleHtml + _sizeHtml + "<dt></dl>";
        });
        $('#type_content .new_tab').html(_html);
    }
    //热点切换	
    $('#hot_button li').mouseover(function(){
        var _this = $(this);
        if (!_this.hasClass("hot_current")) {
            $('.hot_current').removeClass("hot_current");
            _this.addClass("hot_current");
            var _id = _this.attr("id");
            var index = 0;
            if (_id == "hot_secound") {
                index = 1;
            }
            else 
                if (_id == "hot_third") {
                    index = 2;
              }
            fullHtml(hotProblem[index]);
            var randomIndex = parseInt(picProblem.length * Math.random());
            fullPic(randomIndex);
        }
    });
    //统计解决与未解决问题数量
    setInterval(function(){
        $.post("json/problem.countProblem.action", function(data){
            var _count = data.countProblem;
            $('#news_dynamic div.resolved span').html(_count.resolved);
            $('#news_dynamic div.un_resolved span').html(_count.unResolved);
        }, "json");
    }, 1000);
    //统计解决与未解决问题数量
    setInterval(function(){
        $.post("json/problem.countUserQA.action", function(data){
            var _count = data.myProblemCount;
            $('#news_dynamic div.myProblems span').html(_count.myProblem);
            $('#news_dynamic div.myAnswers span').html(_count.myAnswer);
        }, "json");
    }, 1000);
    
    
    
    
    //加载分类
    var category;
    $.post("json/category.loadCategoryByType.action", {
        type: "problem"
    }, function(data){
        category = data.categoryList;
        var _html = "";
        $.each(category, function(i, obj){
            var type_current = "";
            if (i == 0) {
                type_current = "type_current";
            }
            _html += "<li data-id='" + obj.id + "' class='" + type_current + "'>" + obj.name + "</li>";
        });
        $('#type_name .type_detail ul').html(_html);
        
    }, "json");
    //分类浏览
    $('#type_name .type_detail ul').delegate('li', 'click', function(){
        var $this = $(this);
        tabSwitch("type_view");
        $('.type_current').removeClass("type_current");
        $this.addClass("type_current");
        $('.qa_paging').load("user/common/paging.jsp", function(){
            getPageTotal();
        });
        problemPage(1);
        document.getElementById('question_bottom').scrollIntoView(true);
    });
    //分类分页数据加载
    function problemPage(page){
        var _id = $('.type_current').attr("data-id");
        $.post("json/problem.loadProblemByType.action", {
            currentPage: page,
            categoryId: _id
        }, function(data){
            var list = data.typeProblem;
            fullProblem(list);
        }, "json");
    }
    function tabSwitch(tab){
        if (tab == "new_view") {
            $('#type_content .qa_paging').removeClass("paging_view");
            $('#type_content .new_view').addClass("current_view");
            $('#type_content .new_view').removeClass("next_view");
            $('#type_content .type_view').removeClass("current_view");
            $('#type_content .type_view').addClass("next_view");
        }
        else {
            $('#type_content .qa_paging').addClass("paging_view");
            $('#type_content .new_view').removeClass("current_view");
            $('#type_content .new_view').addClass("next_view");
            $('#type_content .type_view').addClass("current_view");
            $('#type_content .type_view').removeClass("next_view");
        }
    }
    //提问弹出框
    $('#question_count .ask.myask').click(function(){
        myIframe("我要提问?", '80px', '600px', '500px', 'user/problem/addProblem.jsp');
    });
    //问题详情
    $('#hot_content').delegate('img.problem_detail', 'mouseover', function(){
        var $this = $(this);
        var dataId = $this.attr("data-id");
        $.post("json/problem.findProblemById.action", {
            id: dataId,
            requestType: "json"
        }, function(data){
            var myTitle = "点击查看 \"" + data.problemTitle + "\" 问题详情";
            $this.attr("title", myTitle);
            //            layerIndex = myTips(myTitle, $this, 2);
        }, "json");
    });
    
    //    //弹出层封装方法
    //    function myTips(title, select, type){
    //        var index = layer.tips(title, select, {
    //            guide: type,
    //            style: ['background-color:#0066CC; color:#fff', '#0066CC'],
    //            maxWidth: 250,
    //            time: 0
    //        });
    //        return index;
    //    }
    $('#hot_content,#type_content .new_tab,#myProblem').delegate('img.problem_detail,a.problem_detail,dt.problem_detail,span.to_best', 'click', function(){
        var $this = $(this);
        var dataId = $this.attr("data-id");
        myIframe("问答详情", '5px', '1000px', '650px', 'user/problem.findProblemById.action?requestType=jsp&id=' + dataId);
    });
    //我的提问
    $('#question_count div.btn div.myProblem').click(function(){
        myIframe("我的提问", '0px', '1300px', '655px', 'user/problem.loadProblemByUser.action?currentPage=1');
    });
    //我的回答
    $('#question_count div.btn div.replay').click(function(){
        myIframe("我的回答", '0px', '1300px', '655px', 'user/problem.loadProblemByAnswer.action?currentPage=1');
    });
    
    //填充热点问题内容
    function fullHtml(problem){
        $('#hot_content span.qa_problem a').html(problem.title);
        $('#hot_content span.qa_problem a').addClass("problem_detail");
        $('#hot_content span.qa_problem a').attr("data-id", problem.id);
        var answerList = problem.answers;
        var answerObj = answerList[0];
        
        var _answer = answerObj.content;
        if (_answer.length > 100) {
            _answer = _answer.substr(0, 100) + "...";
        }
        var _createTime = answerObj.createTime.replace("T", " ");
        $('#hot_content span.qa_answer').html(_answer);
        $('#hot_content span.qa_user span').html(answerObj.user.name);
        $('#hot_content span.qa_time span').html(_createTime);
    }
    //填充热点图片问题
    function fullPic(index){
        if (picProblem.length > 0) {
            var fileServer = $.cookie("FILE_SERVER_URL");
            var _url = fileServer + picProblem[index].url;
            $('#hot_content img.hotimg').attr("src", _url);
            $('#hot_content img.hotimg').attr("data-id", picProblem[index].appId);
            $('#hot_content img.hotimg').addClass("problem_detail");
            if (_url != "" && _url != null) {
                $('#hot_content img.hotimg').css("display", "block");
            }
        }
    }
    
    function getPageTotal(){
        var _id = $('.type_current').attr('data-id');
        $.post("json/problem.loadCountByType.action", {
            categoryId: _id
        }, function(data){
            var _count = data.pageTotal;
            $('.pagination').jqPagination({
                link_string: '/?page={page_number}',
                current_page: _count == 0 ? 0 : 1,
                max_page: _count,
                paged: function(page){
                    document.getElementById('content').scrollIntoView(true);
                    loading();
                    problemPage(page);
                    loadingEnd();
                }
            });
        }, "json");
    }
});

