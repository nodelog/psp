<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<base
	href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/">
<title>问答首页</title>
<link rel="stylesheet" type="text/css" href="css/problem.css">
<script type="text/javascript" src="js/problem.js"></script>
</head>
<body>
	<%--最热问题/问题统计--%>
	<div id="question_top">
		<div id="question_hot">
			<div id="hot_content">
				<img class="hotimg" src="" title=""/>
				<p class="qa">
					<span class="problem_ico">问</span> <span class="qa_problem"><a></a>
					</span>
				</p>
				<p class="qa answer">
					<span class="answer_ico">答</span> <span class="qa_answer"></span>
				</p>
				<span class="qa_user">回答者：<span></span>
				</span> <span class="qa_time">回答时间：<span></span>
				</span>
			</div>
			<div id="hot_button">
				<ul>
					<li id="hot_first" class="hot_current"></li>
					<li id="hot_secound"></li>
					<li id="hot_third"></li>
				</ul>
			</div>
		</div>
		<div id="question_count">
			<div class="leifeng">
				<div class="leifeng_pic">
					<img src="${user.head }"/>
				</div>
				<div class="leifeng_text">
					<p>${user.name }</p>
					<p>等级：${user.level.levelRule.levelNumber }</p>
					<p>公益币：${user.level.scoreNumber }</p>
				</div>
			</div>
			<div class="btn">
				<div class="ask myProblem">
					我的提问
				</div>
				<div class="replay">
					我的回答
				</div>
			</div>
			<div class="btn">
				<div class="ask myask">
					<span></span>我要提问
				</div>
			</div>

		</div>
	</div>
	<%--分类浏览/问题统计--%>
	<div id="question_bottom">
		<div id="question_type">
			<div id="type_name">
				<div class="type_tip">问题分类</div>
				<div class="type_detail">
					<ul></ul>
				</div>
			</div>
			<div id="type_content">
				<div class="tab">
					<a class="type_view next_view">分类浏览</a> <a
						class="new_view current_view">最新问题</a>
				</div>
				<div class="new_tab"></div>
				<div class="qa_paging"></div>
			</div>
		</div>
		<div id="question_news">
			<div id="news_dynamic">
				<div class="title">平台问题实时统计：</div>
				<div class="resolved">
					已解决:<span class="number"></span>
				</div>
				<div class="un_resolved">
					未解决:<span class="number"></span>
				</div>
				<div><hr></div>
				<div class="title">我的QA实时统计：</div>
				<div class="myProblems">
					提问:<span class="number"></span>
				</div>
				<div class="myAnswers">
					回答:<span class="number"></span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>