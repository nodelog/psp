package com.psp.dao;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Download;
import com.psp.web.domain.User;

public interface DownloadDao {

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
}
