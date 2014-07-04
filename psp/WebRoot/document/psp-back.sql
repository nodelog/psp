/*
Navicat MySQL Data Transfer

Source Server         : MYSQL_LOCAL_OF_CHAOS
Source Server Version : 50018
Source Host           : localhost:3306
Source Database       : psp

Target Server Type    : MYSQL
Target Server Version : 50018
File Encoding         : 65001

Date: 2014-03-24 13:48:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `psp_admin`
-- ----------------------------
DROP TABLE IF EXISTS `psp_admin`;
CREATE TABLE `psp_admin` (
`admin_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员编号' ,
`admin_name`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员用户名' ,
`admin_password`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员登陆密码' ,
`admoin_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`admoin_password`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`admin_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='管理员用户'
/*!50003 AUTO_INCREMENT=2 */

;

-- ----------------------------
-- Records of psp_admin
-- ----------------------------
BEGIN;
INSERT INTO `psp_admin` VALUES ('1', 'admin', '21232F297A57A5A743894A0E4A801FC3', null, null);
COMMIT;

-- ----------------------------
-- Table structure for `psp_answer`
-- ----------------------------
DROP TABLE IF EXISTS `psp_answer`;
CREATE TABLE `psp_answer` (
`answer_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '答案id' ,
`user_id`  int(11) NOT NULL COMMENT '用户id' ,
`problem_id`  int(11) NOT NULL COMMENT '问题id' ,
`answer_content`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '答案内容' ,
`answer_order`  int(11) NOT NULL COMMENT '第几个答案' ,
`answer_time`  datetime NOT NULL COMMENT '答案创建时间' ,
`answer_status`  int(2) NOT NULL COMMENT '答案状态（最好答案，非最好答案）' ,
PRIMARY KEY (`answer_id`),
FOREIGN KEY (`problem_id`) REFERENCES `psp_problem` (`problem_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='问题对应的答案表; InnoDB free: 8192 kB; (`problem_id`) REFER `psp/psp_problem`(`problem_'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_answer
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_category`
-- ----------------------------
DROP TABLE IF EXISTS `psp_category`;
CREATE TABLE `psp_category` (
`category_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '类别id' ,
`category_name`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类别名称' ,
`category_level`  int(2) NOT NULL COMMENT '类别等级（父类别，子类别）' ,
`category_parent`  int(11) NOT NULL COMMENT '父类别id' ,
`category_child`  int(11) NOT NULL COMMENT '子类别id' ,
`category_type`  int(2) NOT NULL COMMENT '类别分类（问题，技术，文档，软件，多媒体，需求）' ,
PRIMARY KEY (`category_id`),
FOREIGN KEY (`category_parent`) REFERENCES `psp_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`category_child`) REFERENCES `psp_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='类别表; InnoDB free: 8192 kB; (`category_parent`) REFER `psp/psp_category`(`categor'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_category
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_doc`
-- ----------------------------
DROP TABLE IF EXISTS `psp_doc`;
CREATE TABLE `psp_doc` (
`doc_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户id' ,
`doc_name`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文档名称' ,
`doc_path`  varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文档路径' ,
`doc_time`  datetime NOT NULL COMMENT '上传时间' ,
`doc_size`  varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文档大小' ,
`doc_grade`  double(4,0) NOT NULL COMMENT '平均评分' ,
`doc_status`  int(2) NOT NULL COMMENT '文档状态（是否已经删除）' ,
PRIMARY KEY (`doc_id`),
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='文档贡献; InnoDB free: 8192 kB; (`user_id`) REFER `psp/psp_user`(`user_id`)'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_doc
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_doc_log`
-- ----------------------------
DROP TABLE IF EXISTS `psp_doc_log`;
CREATE TABLE `psp_doc_log` (
`log_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户' ,
`doc_id`  int(11) NOT NULL COMMENT '文档' ,
`log_action`  int(2) NOT NULL COMMENT '操作（浏览，下载，评论，评分，回复）' ,
`log_time`  datetime NOT NULL COMMENT '时间' ,
`log_content`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容' ,
`comment_order`  int(11) NOT NULL COMMENT '评论次序' ,
`replay_order`  int(11) NOT NULL COMMENT '回复次序' ,
`replay_user`  int(11) NOT NULL COMMENT '被回复人' ,
PRIMARY KEY (`log_id`),
FOREIGN KEY (`doc_id`) REFERENCES `psp_doc` (`doc_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`replay_user`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='文档操作日志; InnoDB free: 8192 kB; (`doc_id`) REFER `psp/psp_doc`(`doc_id`); (`user_i'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_doc_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_download`
-- ----------------------------
DROP TABLE IF EXISTS `psp_download`;
CREATE TABLE `psp_download` (
`download_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户' ,
`resource_type`  int(2) NOT NULL COMMENT '资源类型（文档，多媒体，软件）' ,
`resource_id`  int(11) NOT NULL COMMENT '资源id' ,
`download_time`  datetime NOT NULL COMMENT '下载时间' ,
PRIMARY KEY (`download_id`),
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='下载中心; InnoDB free: 8192 kB; (`user_id`) REFER `psp/psp_user`(`user_id`)'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_download
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_friend`
-- ----------------------------
DROP TABLE IF EXISTS `psp_friend`;
CREATE TABLE `psp_friend` (
`friend_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '朋友表记录id' ,
`first_user`  int(11) NOT NULL COMMENT '第一个用户ID' ,
`second_user`  int(11) NOT NULL COMMENT '第二个用户ID' ,
`status`  int(2) NOT NULL COMMENT '状态（关联，解除）' ,
PRIMARY KEY (`friend_id`),
FOREIGN KEY (`first_user`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`second_user`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='好友表; InnoDB free: 8192 kB; (`first_user`) REFER `psp/psp_user`(`user_id`); (`sec'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_friend
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_level`
-- ----------------------------
DROP TABLE IF EXISTS `psp_level`;
CREATE TABLE `psp_level` (
`level_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '等级id' ,
`user_id`  int(11) NOT NULL COMMENT '用户id' ,
`level_rule`  int(11) NOT NULL COMMENT '等级规则id' ,
`score_number`  int(11) NOT NULL COMMENT '用户积分数' ,
PRIMARY KEY (`level_id`),
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`level_rule`) REFERENCES `psp_level_rule` (`rule_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='记录用户当前等级和积分; InnoDB free: 8192 kB; (`user_id`) REFER `psp/psp_user`(`user_id`); '
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_level
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_level_rule`
-- ----------------------------
DROP TABLE IF EXISTS `psp_level_rule`;
CREATE TABLE `psp_level_rule` (
`rule_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '等级规则id' ,
`level_number`  int(11) NOT NULL COMMENT '等级数' ,
`min_score`  int(11) NOT NULL COMMENT '该等级最小积分' ,
`max_score`  int(11) NOT NULL COMMENT '该等级最大积分' ,
PRIMARY KEY (`rule_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='定义等级规则'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_level_rule
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_media`
-- ----------------------------
DROP TABLE IF EXISTS `psp_media`;
CREATE TABLE `psp_media` (
`media_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户' ,
`media_name`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '多媒体名称' ,
`media_type`  int(2) NOT NULL COMMENT '类型（音乐，视频）' ,
`category_id`  int(11) NOT NULL COMMENT '分类' ,
`media_time`  datetime NOT NULL COMMENT '上传时间' ,
`media_size`  varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '大小' ,
`media_status`  int(2) NOT NULL COMMENT '状态（是否支持在线播放）' ,
PRIMARY KEY (`media_id`),
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`category_id`) REFERENCES `psp_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='多媒体库; InnoDB free: 8192 kB; (`user_id`) REFER `psp/psp_user`(`user_id`); (`categ'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_media
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_message`
-- ----------------------------
DROP TABLE IF EXISTS `psp_message`;
CREATE TABLE `psp_message` (
`message_id`  int(11) NOT NULL AUTO_INCREMENT ,
`sender_user`  int(11) NOT NULL ,
`receiver_user`  int(11) NOT NULL ,
`message_content`  varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`message_time`  datetime NOT NULL ,
`message_status`  int(2) NOT NULL ,
PRIMARY KEY (`message_id`),
FOREIGN KEY (`sender_user`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`receiver_user`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='消息中心; InnoDB free: 8192 kB; (`sender_user`) REFER `psp/psp_user`(`user_id`); (`r'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_message
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_need`
-- ----------------------------
DROP TABLE IF EXISTS `psp_need`;
CREATE TABLE `psp_need` (
`need_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户' ,
`category_id`  int(11) NOT NULL COMMENT '分类' ,
`need_title`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主题' ,
`need_content`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容' ,
`need_time`  datetime NOT NULL COMMENT '发布时间' ,
`need_score`  int(11) NOT NULL COMMENT '积分' ,
`need_status`  int(2) NOT NULL COMMENT '状态（未解决，已解决）' ,
PRIMARY KEY (`need_id`),
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`category_id`) REFERENCES `psp_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='需求频道; InnoDB free: 8192 kB; (`user_id`) REFER `psp/psp_user`(`user_id`); (`categ'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_need
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_problem`
-- ----------------------------
DROP TABLE IF EXISTS `psp_problem`;
CREATE TABLE `psp_problem` (
`problem_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '问题id' ,
`user_id`  int(11) NOT NULL COMMENT '用户id' ,
`problem_title`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '问题标题' ,
`problem_content`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '问题内容' ,
`create_time`  datetime NOT NULL COMMENT '创建时间' ,
`confirm_time`  datetime NOT NULL COMMENT '确认最佳答案时间' ,
`category_id`  int(11) NOT NULL COMMENT '类型id' ,
`problem_status`  int(2) NOT NULL COMMENT '问题状态' ,
PRIMARY KEY (`problem_id`),
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`category_id`) REFERENCES `psp_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='问题表; InnoDB free: 8192 kB; (`user_id`) REFER `psp/psp_user`(`user_id`); (`catego'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_problem
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_public`
-- ----------------------------
DROP TABLE IF EXISTS `psp_public`;
CREATE TABLE `psp_public` (
`public_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '活动主键' ,
`public_title`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动名称' ,
`public_content`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动内容' ,
`start_time`  datetime NOT NULL COMMENT '开始时间' ,
`end_time`  datetime NOT NULL COMMENT '结束时间' ,
`apply_time`  datetime NOT NULL COMMENT '报名时间' ,
`public_score`  int(11) NOT NULL COMMENT '活动积分' ,
`public_status`  int(2) NOT NULL COMMENT '状态(未开始，报名中，正在进行，已结束）' ,
PRIMARY KEY (`public_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='公益活动表'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_public
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_public_log`
-- ----------------------------
DROP TABLE IF EXISTS `psp_public_log`;
CREATE TABLE `psp_public_log` (
`log_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '活动日志主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户id' ,
`public_id`  int(11) NOT NULL COMMENT '活动id' ,
`public_action`  int(11) NOT NULL COMMENT '活动行为（报名，参加活动）' ,
`action_time`  datetime NOT NULL COMMENT '操作时间' ,
PRIMARY KEY (`log_id`),
FOREIGN KEY (`public_id`) REFERENCES `psp_public` (`public_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='活动日志表; InnoDB free: 8192 kB; (`public_id`) REFER `psp/psp_public`(`public_id`); '
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_public_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_score`
-- ----------------------------
DROP TABLE IF EXISTS `psp_score`;
CREATE TABLE `psp_score` (
`score_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '积分规则id' ,
`score_action`  int(11) NOT NULL COMMENT '积分行为（注册，登录，评论，发表等）' ,
`score_number`  int(11) NOT NULL COMMENT '用户可以获得积分数' ,
PRIMARY KEY (`score_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='定义积分规则'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_score
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_score_log`
-- ----------------------------
DROP TABLE IF EXISTS `psp_score_log`;
CREATE TABLE `psp_score_log` (
`log_id`  int(11) NOT NULL AUTO_INCREMENT ,
`user_id`  int(11) NOT NULL ,
`score_id`  int(11) NOT NULL ,
PRIMARY KEY (`log_id`),
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`score_id`) REFERENCES `psp_score` (`score_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='用户获得积分日志表; InnoDB free: 8192 kB; (`user_id`) REFER `psp/psp_user`(`user_id`); (`'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_score_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_skill`
-- ----------------------------
DROP TABLE IF EXISTS `psp_skill`;
CREATE TABLE `psp_skill` (
`skill_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户' ,
`category_id`  int(11) NOT NULL COMMENT '分类' ,
`skill_title`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题' ,
`skill_content`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容' ,
`skill_file`  varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '附件' ,
`skill_time`  datetime NOT NULL COMMENT '创建时间' ,
`skill_grade`  double(4,0) NOT NULL COMMENT '平均评分' ,
`skill_view`  int(11) NOT NULL COMMENT '浏览次数' ,
`skill_status`  int(2) NOT NULL COMMENT '技术状态（未完待续，已完结）' ,
`replay_user`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`skill_id`),
FOREIGN KEY (`replay_user`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`category_id`) REFERENCES `psp_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='技术指南; InnoDB free: 8192 kB; (`replay_user`) REFER `psp/psp_user`(`user_id`); (`u'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_skill
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_skill_talk`
-- ----------------------------
DROP TABLE IF EXISTS `psp_skill_talk`;
CREATE TABLE `psp_skill_talk` (
`skill_talk_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户id' ,
`skill_id`  int(11) NOT NULL ,
`talk_action`  int(2) NOT NULL COMMENT '行为（评论，回复，评分）' ,
`talk_content`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容（评论，回复，分数）' ,
`talk_time`  datetime NOT NULL COMMENT '时间' ,
`comment_order`  int(11) NOT NULL COMMENT '评论次序（不是评论，为自定义空值）' ,
`replay_order`  int(11) NOT NULL COMMENT '回复次序' ,
`replay_user`  int(11) NOT NULL COMMENT '被回复人(回复给谁)' ,
PRIMARY KEY (`skill_talk_id`),
FOREIGN KEY (`replay_user`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`skill_id`) REFERENCES `psp_skill` (`skill_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='技术交流; InnoDB free: 8192 kB; (`replay_user`) REFER `psp/psp_user`(`user_id`); (`u'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_skill_talk
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_software`
-- ----------------------------
DROP TABLE IF EXISTS `psp_software`;
CREATE TABLE `psp_software` (
`software_id`  int(11) NOT NULL AUTO_INCREMENT ,
`user_id`  int(11) NOT NULL ,
`category_id`  int(11) NOT NULL ,
`software_name`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`software_url`  varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`software_time`  datetime NOT NULL ,
`software_size`  varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`software_grade`  double(4,0) NOT NULL ,
`software_status`  int(2) NOT NULL ,
PRIMARY KEY (`software_id`),
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`category_id`) REFERENCES `psp_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='软件共享; InnoDB free: 8192 kB; (`user_id`) REFER `psp/psp_user`(`user_id`); (`categ'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_software
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_software_log`
-- ----------------------------
DROP TABLE IF EXISTS `psp_software_log`;
CREATE TABLE `psp_software_log` (
`log_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户' ,
`software_id`  int(11) NOT NULL COMMENT '软件' ,
`log_action`  int(2) NOT NULL COMMENT '操作（浏览，下载，评论，评分，回复）' ,
`log_time`  datetime NOT NULL COMMENT '时间' ,
`log_content`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容' ,
`comment_order`  int(11) NOT NULL COMMENT '评论次序' ,
`replay_order`  int(11) NOT NULL COMMENT '回复此序' ,
`replay_user`  int(11) NOT NULL COMMENT '被回复人' ,
PRIMARY KEY (`log_id`),
FOREIGN KEY (`software_id`) REFERENCES `psp_software` (`software_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`replay_user`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='软件操作日志; InnoDB free: 8192 kB; (`software_id`) REFER `psp/psp_software`(`software'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_software_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_solve`
-- ----------------------------
DROP TABLE IF EXISTS `psp_solve`;
CREATE TABLE `psp_solve` (
`solve_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(11) NOT NULL COMMENT '用户' ,
`need_id`  int(11) NOT NULL COMMENT '需求' ,
`solve_scheme`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '方案' ,
`solve_order`  int(11) NOT NULL COMMENT '方案次序' ,
`solve_time`  datetime NOT NULL COMMENT '发布方案时间' ,
`solve_status`  int(2) NOT NULL COMMENT '方案状态（是否为最好方案）' ,
PRIMARY KEY (`solve_id`),
FOREIGN KEY (`need_id`) REFERENCES `psp_need` (`need_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`user_id`) REFERENCES `psp_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='需求解决方案表; InnoDB free: 8192 kB; (`need_id`) REFER `psp/psp_need`(`need_id`); (`us'
/*!50003 AUTO_INCREMENT=1 */

;

-- ----------------------------
-- Records of psp_solve
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `psp_user`
-- ----------------------------
DROP TABLE IF EXISTS `psp_user`;
CREATE TABLE `psp_user` (
`user_id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID' ,
`user_name`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名' ,
`user_password`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '秘密，32位加密' ,
`user_email`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '绑定邮箱' ,
`email_login`  tinyint(1) NOT NULL COMMENT '绑定邮箱是否可作为登录名' ,
`validation_problem`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '验证问题' ,
`validation_answer`  varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '验证问题答案' ,
`user_status`  int(2) NOT NULL COMMENT '状态（在线，离线，禁用）' ,
PRIMARY KEY (`user_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='用户表'
/*!50003 AUTO_INCREMENT=2 */

;

-- ----------------------------
-- Records of psp_user
-- ----------------------------
BEGIN;
INSERT INTO `psp_user` VALUES ('1', 'wwwwww', 'www', 'www', '1', 'www', 'www', '0');
COMMIT;

-- ----------------------------
-- Indexes structure for table psp_admin
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_admin_admin_name` USING BTREE ON `psp_admin`(`admin_name`);

-- ----------------------------
-- Auto increment value for `psp_admin`
-- ----------------------------
ALTER TABLE `psp_admin` AUTO_INCREMENT=2;

-- ----------------------------
-- Indexes structure for table psp_answer
-- ----------------------------
CREATE INDEX `FK3A9D39705339DBB8` USING BTREE ON `psp_answer`(`problem_id`);
CREATE INDEX `FK3A9D3970A83EC43C` USING BTREE ON `psp_answer`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_answer`
-- ----------------------------
ALTER TABLE `psp_answer` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_category
-- ----------------------------
CREATE INDEX `FK28FE12301FE6F56B` USING BTREE ON `psp_category`(`category_parent`);
CREATE INDEX `FK28FE1230C5E484FB` USING BTREE ON `psp_category`(`category_child`);

-- ----------------------------
-- Auto increment value for `psp_category`
-- ----------------------------
ALTER TABLE `psp_category` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_doc
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_doc_doc_name` USING BTREE ON `psp_doc`(`doc_name`);
CREATE INDEX `FKEF4E38C6A83EC43C` USING BTREE ON `psp_doc`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_doc`
-- ----------------------------
ALTER TABLE `psp_doc` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_doc_log
-- ----------------------------
CREATE INDEX `FKB885384B35F8FBFF` USING BTREE ON `psp_doc_log`(`doc_id`);
CREATE INDEX `FKB885384BA83EC43C` USING BTREE ON `psp_doc_log`(`user_id`);
CREATE INDEX `FKB885384BEFED0B50` USING BTREE ON `psp_doc_log`(`replay_user`);

-- ----------------------------
-- Auto increment value for `psp_doc_log`
-- ----------------------------
ALTER TABLE `psp_doc_log` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_download
-- ----------------------------
CREATE INDEX `FK7B161DBAA83EC43C` USING BTREE ON `psp_download`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_download`
-- ----------------------------
ALTER TABLE `psp_download` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_friend
-- ----------------------------
CREATE INDEX `FK43590450C0D6DEE3` USING BTREE ON `psp_friend`(`second_user`);
CREATE INDEX `FK43590450A76ED627` USING BTREE ON `psp_friend`(`first_user`);

-- ----------------------------
-- Auto increment value for `psp_friend`
-- ----------------------------
ALTER TABLE `psp_friend` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_level
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_level_user_id` USING BTREE ON `psp_level`(`user_id`);
CREATE UNIQUE INDEX `i_psp_level_level_rule_id` USING BTREE ON `psp_level`(`level_rule`);
CREATE INDEX `FK550FA3928D8ECE55` USING BTREE ON `psp_level`(`level_rule`);
CREATE INDEX `FK550FA392A83EC43C` USING BTREE ON `psp_level`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_level`
-- ----------------------------
ALTER TABLE `psp_level` AUTO_INCREMENT=1;

-- ----------------------------
-- Auto increment value for `psp_level_rule`
-- ----------------------------
ALTER TABLE `psp_level_rule` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_media
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_media_media_name` USING BTREE ON `psp_media`(`media_name`);
CREATE INDEX `FK551D77F2B058525C` USING BTREE ON `psp_media`(`category_id`);
CREATE INDEX `FK551D77F2A83EC43C` USING BTREE ON `psp_media`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_media`
-- ----------------------------
ALTER TABLE `psp_media` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_message
-- ----------------------------
CREATE INDEX `FK84773C953E896E48` USING BTREE ON `psp_message`(`receiver_user`);
CREATE INDEX `FK84773C95E4E679C2` USING BTREE ON `psp_message`(`sender_user`);

-- ----------------------------
-- Auto increment value for `psp_message`
-- ----------------------------
ALTER TABLE `psp_message` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_need
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_need_need_title` USING BTREE ON `psp_need`(`need_title`);
CREATE INDEX `FKFA7D46C8B058525C` USING BTREE ON `psp_need`(`category_id`);
CREATE INDEX `FKFA7D46C8A83EC43C` USING BTREE ON `psp_need`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_need`
-- ----------------------------
ALTER TABLE `psp_need` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_problem
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_problem_problem_title` USING BTREE ON `psp_problem`(`problem_title`);
CREATE INDEX `FK3918FF2DB058525C` USING BTREE ON `psp_problem`(`category_id`);
CREATE INDEX `FK3918FF2DA83EC43C` USING BTREE ON `psp_problem`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_problem`
-- ----------------------------
ALTER TABLE `psp_problem` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_public
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_public_public_name` USING BTREE ON `psp_public`(`public_title`);

-- ----------------------------
-- Auto increment value for `psp_public`
-- ----------------------------
ALTER TABLE `psp_public` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_public_log
-- ----------------------------
CREATE INDEX `FK603F920A83EC43C` USING BTREE ON `psp_public_log`(`user_id`);
CREATE INDEX `FK603F920C6D25746` USING BTREE ON `psp_public_log`(`public_id`);

-- ----------------------------
-- Auto increment value for `psp_public_log`
-- ----------------------------
ALTER TABLE `psp_public_log` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_score
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_score_score_action` USING BTREE ON `psp_score`(`score_action`);

-- ----------------------------
-- Auto increment value for `psp_score`
-- ----------------------------
ALTER TABLE `psp_score` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_score_log
-- ----------------------------
CREATE INDEX `FK1859C92552637258` USING BTREE ON `psp_score_log`(`score_id`);
CREATE INDEX `FK1859C925A83EC43C` USING BTREE ON `psp_score_log`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_score_log`
-- ----------------------------
ALTER TABLE `psp_score_log` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_skill
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_skill_skill_title` USING BTREE ON `psp_skill`(`skill_title`);
CREATE INDEX `FK5574D25FB058525C` USING BTREE ON `psp_skill`(`category_id`);
CREATE INDEX `FK5574D25FA83EC43C` USING BTREE ON `psp_skill`(`user_id`);
CREATE INDEX `FK5574D25FEFED0B50` USING BTREE ON `psp_skill`(`replay_user`);

-- ----------------------------
-- Auto increment value for `psp_skill`
-- ----------------------------
ALTER TABLE `psp_skill` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_skill_talk
-- ----------------------------
CREATE INDEX `FKF44BBE8CA83EC43C` USING BTREE ON `psp_skill_talk`(`user_id`);
CREATE INDEX `FKF44BBE8CEF0A65F8` USING BTREE ON `psp_skill_talk`(`skill_id`);
CREATE INDEX `FKF44BBE8CEFED0B50` USING BTREE ON `psp_skill_talk`(`replay_user`);

-- ----------------------------
-- Auto increment value for `psp_skill_talk`
-- ----------------------------
ALTER TABLE `psp_skill_talk` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_software
-- ----------------------------
CREATE INDEX `FK749EB6D9B058525C` USING BTREE ON `psp_software`(`category_id`);
CREATE INDEX `FK749EB6D9A83EC43C` USING BTREE ON `psp_software`(`user_id`);

-- ----------------------------
-- Auto increment value for `psp_software`
-- ----------------------------
ALTER TABLE `psp_software` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_software_log
-- ----------------------------
CREATE INDEX `FK67274DEA83EC43C` USING BTREE ON `psp_software_log`(`user_id`);
CREATE INDEX `FK67274DEEFED0B50` USING BTREE ON `psp_software_log`(`replay_user`);
CREATE INDEX `FK67274DED732A5BC` USING BTREE ON `psp_software_log`(`software_id`);

-- ----------------------------
-- Auto increment value for `psp_software_log`
-- ----------------------------
ALTER TABLE `psp_software_log` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_solve
-- ----------------------------
CREATE INDEX `FK5576B04DA83EC43C` USING BTREE ON `psp_solve`(`user_id`);
CREATE INDEX `FK5576B04D1E058C5C` USING BTREE ON `psp_solve`(`need_id`);

-- ----------------------------
-- Auto increment value for `psp_solve`
-- ----------------------------
ALTER TABLE `psp_solve` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table psp_user
-- ----------------------------
CREATE UNIQUE INDEX `i_psp_user_user_name` USING BTREE ON `psp_user`(`user_name`);

-- ----------------------------
-- Auto increment value for `psp_user`
-- ----------------------------
ALTER TABLE `psp_user` AUTO_INCREMENT=2;
