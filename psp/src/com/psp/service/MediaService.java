package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.File;
import com.psp.web.domain.Media;
import com.psp.web.domain.User;

public interface MediaService {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Media findMediaByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Media findMediaById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param media
	* @return String   
	* @throws 
	*/
	void addMedia(Media media);
	void addMedia(Media media,Integer imageId);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Media>   
	* @throws 
	*/
	List<Media> listPaging(Page page,Category category);
	List<Media> listPaging(Page page,Category category,User user);
	/**
	* 删除实体
	* @author wangyachao
	* @param media
	* @throws 
	*/
	void deleteMedia(Media media);
	/**
	 * 查询总页数
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page);
	/**
	* 更新实体
	* @author wangyachao
	* @param media
	* @param id 
	* @throws 
	*/
	void updateMedia(Media media, int id);
	Integer getTotatlByType(Category category);
	Integer getTotatlByUser(Category category, User user);
	List<File> loadPicFilm();
}
