package com.psp.service;

import java.util.List;
import java.util.Map;

import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Document;
import com.psp.web.domain.Download;
import com.psp.web.domain.Media;
import com.psp.web.domain.Software;
import com.psp.web.domain.User;

public interface DownloadService {
	

	/**
	 * 添加实体
	 * 
	 * @author wangyachao
	 * @param download
	 * @return String   
	 * @throws 
	 */
	void addDownload(Download download);

	/**
	 * 分页列表数据
	 * 
	 * @author wangyachao
	 * @param page
	 * @return List<Download>   
	 * @throws 
	 */
	List<Download> listPaging(Page page);

	List<Download> listPaging(Page page, User user);

	/**
	 * 查询总页数
	 * 
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal(Page page);

	Integer getPageTotal(Page page, User user);

	Integer getPageTotal(Category category);

	/**
	 * 更新实体
	 * 
	 * @author wangyachao
	 * @param download
	 * @param id
	 * @throws 
	 */
	Map<String, List<Category>> loadCategory();

	List<Media> mediaList(Category category, Page page);

	List<Document> documentList(Category category, Page page);

	List<Software> softwareList(Category category, Page page);

	Category getCategoryById(Integer id);

}
