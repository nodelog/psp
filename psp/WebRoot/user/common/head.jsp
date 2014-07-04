<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>

    	<div id="head">
			<div id="logo" title="郑大公益首页"></div>
			<div id="person">
				<div href="javascript:void(0);" id="onlineCountDiv">
				<span class="number" id="onlineHead">${onlineCount }</span>人在线
				</div>
				<div href="javascript:void(0);" id="personCenter" title="个人中心">
					<img src="${user.head}" class="user-head"/>
					<span id="currentUser">${user.name }<span class="badge pull-right" id="newCount"></span></span>
				</div>
				<div href="javascript:void(0);" id="exit">退出</div>
				<div class="clear"></div>
			</div>
		</div>
