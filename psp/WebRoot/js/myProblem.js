$(function(){
    $('#myProblem').delegate('dt.problem_detail', 'click', function(){
        var $this = $(this);
        var dataId = $this.attr("data-id");
		myIframe("问答详情",'5px','1000px', '600px','user/problem.findProblemById.action?requestType=jsp&id=' + dataId);
        
    });
	function myIframe(title,offsetX,areaX,areaY,src){
		 var i = $.layer({
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
});
