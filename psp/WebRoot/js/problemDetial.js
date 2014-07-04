$(function(){
    $('#problemDetial a.i_want_answer').bind("click", function(){
        $('#problemDetial div.answer_layer').slideToggle();
    });
    $('#problemDetial span.to_best').click(function(){
		var $this=$(this);
        myAlert("选为最佳答案后无法撤销，确定选为最佳答案吗？", function(){
            var _id = $('#problemDetial div.qa_title h2').attr("data-id");
            var _answerId = $this.attr("data-id");
            $.post("json/problem.bestAnswer.action", {
                id: _id,
                answerId: _answerId
            }, function(data){
				var result = data.result;
                if (result == "success") {
                   location.reload();
                }
                else {
                    myMsg("请选择一个答案");
                }
            }, "json");
        });
    });
    $('#problemDetial .answer_layer a').click(function(){
        var _textarea = $('#problemDetial .answer_box textarea');
        var _value = _textarea.val();
        if (_value.trim() == "") {
            myMsg("请先输入答案");
            return;
        }
        var _id = $('#problemDetial div.qa_title h2').attr("data-id");
        $.post("json/problem.addAnswer.action", {
            id: _id,
            answerText: _value
        }, function(data){
            var result = data.result;
            if (result == "success") {
                myMsg("回答成功！", -1);
            }
            else {
                myMsg("请先输入答案");
            }
        }, "json");
    });
    function myMsg(_msg, index){
        $.layer({
            shadeClose: true,
            time: 2,
            title: false,
            closeBtn: [0, true],
            offset: ['350px', '50%'],
            dialog: {
                btns: 0,
                type: -1,
                msg: _msg
            },
            end: function(){
                parent.layer.close(index);
                if (index == -1) {
                    location.reload();
                }
            }
        });
    }
    function myAlert(_msg, yesFunction){
        var index = $.layer({
            shadeClose: false,
            title: "公益平台提示",
            offset: ['200px', '50%'],
            dialog: {
                btns: 2,
                btn: ['确定', '取消'],
                type: -1,
                msg: _msg,
                yes: yesFunction,
                no: function(index){
                    layer.close(index);
                }
            }
        });
    }
});
