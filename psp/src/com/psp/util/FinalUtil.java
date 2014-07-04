package com.psp.util;

/**
 * 类名称：FinalUtil 类描述：常量工具类 创建人：王亚超 创建时间：2014-3-15 下午11:52:10
 * 
 * @version 1.0
 */
public class FinalUtil {
	public static final boolean TRUE = true;
	public static final boolean FALSE = false;
	// 实体名称
	public static final String USER = "User";
	public static final String PUBLICINTEREST = "PublicInterest";
	public static final String PROBLEM = "Problem";
	public static final String CATEGORY = "Category";
	public static final String ANSWER = "Answer";
	public static final String FILE = "File";
	public static final String DOWNLOAD = "Download";
	public static final String ADMIN = "Admin";

	// 实体代码 file实体中使用
	public static final int PUBLIC_CODE = 1;
	public static final int PROBLEM_CODE = 2;
	public static final int USER_CODE = 3;
	public static final int MEDIA_CODE = 4;
	public static final int SOFTWARE_CODE = 5;
	public static final String USER_NULL = "用户信息为空";
	public static final String USER_NAME_EXISTS = "用户名已经存在";
	public static final String USER_NAME_NOT_EXISTS = "用户名不存在";
	public static final String USER_NAME_NULL = "用户名为空";
	public static final String USER_PASSWORD_NULL = "密码为空";
	public static final String USER_EMAIL_NULL = "邮箱为空";
	public static final String AUTHCODE_NULL = "验证码为空";
	public static final String AUTHCODE_ERROR = "验证码错误";
	public static final String SUCCESS = "success";
	public static final String ERROR = "error";
	public static final String NOT_FOUND = "notFound";
	// email 常量
	public final static String EMAIL_SENDER = "wangyachao0991@sina.cn";
	public final static String EMAIL_SUBJECT = "郑大公益用户注册激活码";
	public final static String EMAIL_HOST = "smtp.sina.com.cn";
	public final static String HOST_NAME = "郑大公益";
	public final static String HOST = "www.psp.com";
	public final static String EMAIL_SEND_SUCCESS = "邮件发送成功！";
	public static final String LIVECODE_NULL = "激活码为空";
	public static final String LIVECODE_ERROR = "激活码错误";

	// 用户状态
	public static final Integer ON_LIINE = 1;
	public static final Integer OFF_LIINE = 2;
	public static final Integer DISABLED = 3;
	// 邮箱是否可以登录
	public static final boolean EMALIL_NOT_LOGIN = false;
	public static final boolean EMALIL_LOGIN = true;

	// 性别
	public static final Integer MALE = 1;
	public static final Integer FEMALE = 2;
	// 自定义null
	public static final String NULL = "";

	// 公益状态(未开始，报名中，正在进行，已结束）
	public static final int PUBLIC_NOT_BEGIN = 1;
	public static final int PUBLIC_APPLAY = 2;
	public static final int PUBLIC_PROCESSING = 3;
	public static final int PUBLIC_END = 4;
	public static final int PUBLIC_DELETE = 5;

	// 分页数据
	public static final int PAGE_EACH = 10;

	// 分类所属类型
	public static final int TYPE_COMMON = 1;
	public static final int TYPE_PROBLEM = 2;
	public static final int TYPE_SKILL = 3;
	public static final int TYPE_DOCUMENT = 4;
	public static final int TYPE_SOFTWARE = 5;
	public static final int TYPE_MEDIA = 6;
	public static final int TYPE_NEED = 7;
	public static final int TYPE_DELETE = 8;
	// 分类状态
	public static final int CATEGORY_ENABLE = 1;
	public static final int CATEGORY_DELETE = 2;
	// 问题状态
	public static final int PROBLEM_UNRESOLVED = 1;
	public static final int PROBLEM_RESOLVED = 2;
	public static final int PROBLEM_DELETE = 3;

	public static final int PROBLEM_HOT_COUNT = 3;
	public static final int PROBLEM_NEW_COUNT = 30;

	// 答案状态
	public static final int ANSWER_UNBEST = 1;
	public static final int ANSWER_BEST = 2;
	public static final int ANSWER_DELETE = 3;

	// ftp属性
	public static final String FTP_URL = "127.0.0.1";
	public static final int FTP_PORT = 21;
	public static final String FTP_USERNAME = "wyc";
	public static final String FTP_PASSWORD = "123456";
	// URL（文件服务器，ftp服务器）
	public static final String FILE_SERVER_URL = "http://10.106.12.76:8080/fileServer/";
	public static final String FILE_SERVER_NAME = "/fileServer/";
	public static final String FTP_SERVER_HOST = "ftp://";
	public static final String FTP_SERVER_URL = "/Apache2.2/htdocs/fileServer/";
	public static final String DOMAIN_HOST = "http://localhost:8080/psp/";
	public static final String FLEX_SERVER_NAME = "/flex/common/simple_document.jsp";
	// 文件服务器目录
	public static final String MEDIA_DIR = "media";
	public static final String PROBLEM_DIR = "problem";
	public static final String PUBLIC_DIR = "public";
	public static final String USER_DIR = "user";
	public static final String SOFTWARE_DIR = "software";
	public static final String DOCUMENT_DIR = "document";
	// 文件名分隔符
	public static final String DELIMITER = "P_S_P_";

	// 文件状态
	public static final int FILE_NORMAL = 1;
	public static final int FILE_DELETE = 2;

	// 请求类型
	public static final String JSON = "json";
	public static final String JSP = "jsp";
	// 媒体状态
	public static final int MEDIA_PLAY_ENBLE = 1;
	public static final int MEDIA_PLAY_UNENBLE = 2;
	public static final int MEDIA_PLAY_DELETE = 3;
	// 媒体类型
	public static final String MEDIA_FILM = "视频资源";
	public static final String MEDIA_MUSIC = "音乐资源";

	// 文件大小单位
	public static final float GB = 1024 * 1024 * 1024F;// byte --GB
	public static final float MB = 1024 * 1024F;// byte --MB
	public static final float KB = 1024F;// byte --KB

	// 添加积分
	public static final int ADD_PROBLEM = 5;
	public static final int ADD_MEDIA = 5;
	public static final int ADD_SOFTWARE = 5;
	public static final int ADD_SKILL = 5;
	public static final int ADD_LOGIN = 5;
	public static final int ADD_DOCUMENT = 5;
	public static final int ADD_REGISTER = 20;

	// 下载记录状态
	public static final int DOWNLOAD_ENBLE = 1;
	public static final int DOWNLOAD_DELETE = 2;
	// 软件状态
	public static final int SOFTWARE_FILE = 1;
	public static final int SOFTWARE_LINK = 2;
	public static final int SOFTWARE_DELETE = 3;
	// 软件操作 操作（浏览，下载，评论，评分，回复）
	public static final int SOFTWARE_VIEW = 1;
	public static final int SOFTWARE_DOWNLOAD = 2;
	public static final int SOFTWARE_COMMONT = 3;
	public static final int SOFTWARE_GRADE = 4;
	public static final int SOFTWARE_REPLAY = 5;
	// 技术状态
	public static final int SKILL_ENBLE = 1;
	public static final int SKILL_DELETE = 2;
	// 技术操作 操作（浏览，评分）
	public static final int SKILL_VIEW = 1;
	public static final int SKILL_GRADE = 2;
	// 文档状态
	public static final int DOCUMENT_ENBLE = 1;
	public static final int DOCUMENT_DELETE = 2;

	// 文档操作 操作（浏览，评分，下载）
	public static final int DOCUMENT_VIEW = 1;
	public static final int DOCUMENT_GRADE = 2;
	public static final int DOCUMENT_DOWNLOAD = 3;
	// 消息状态
	public static final int MESSAGE_NEW = 1;
	public static final int MESSAGE_OLD = 2;
	public static final int MESSAGE_DELETE = 3;
	//预设消息内容
	public static final String MESSAGE_REGISTER="恭喜您！注册成郑大公益平台新用户并获得20个公益币，现在你可以使用平台内的所有服务。";
	public static final String MESSAGE_ADD_PROBLEM="恭喜您！成功提出一个问题并获得5个公益币；问题题目为：";
	public static final String MESSAGE_ADD_ANSWER="恭喜您！你提出的问题得到了解决；问题题目为：";
	public static final String MESSAGE_ADD_SKILL="恭喜您！成功发布一项技术并获得5个公益币，技术标题为：";
	public static final String MESSAGE_ADD_DOCUMENT="恭喜您！成功上传一个文档并获得5个公益币，文档名称为：";
	public static final String MESSAGE_ADD_SOFTWARE="恭喜您！成功上传一个软件并获得5个公益币，软件名称为：";
	public static final String MESSAGE_SHARE_LINK="恭喜您！成功分享一个软件链接并获得5个公益币，链接名称为：";
	public static final String MESSAGE_ADD_FILM="恭喜您！成功上传一部电影并获得5个公益币，电影名称为：";
	public static final String MESSAGE_ADD_MUSIC="恭喜您！成功上传一首音乐并获得5个公益币，音乐名称为：";
}
