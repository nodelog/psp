package com.psp.web.action.user;

import java.util.List;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.FileService;
import com.psp.service.PublicInterestService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.File;
import com.psp.web.domain.PublicInterest;

/**
 * 类名称：PublicInterestAction
 * 类描述：公益活动action
 * 创建人：王亚超
 * 创建时间：2014-4-3 下午7:02:30
 * @version 1.0
 */
public class PublicInterestAction extends BaseAction implements ModelDriven<Page>{
	private static final long serialVersionUID = -6576294142076482531L;
	private Page page = new Page();
	private PublicInterestService publicInterestService;
	private FileService fileService;
	public void setFileService(FileService fileService) {
		this.fileService = fileService;
	}
	public void setPublicInterestService(
			PublicInterestService publicInterestService) {
		this.publicInterestService = publicInterestService;
	}
	/**
	 * 分页列表
	* @return String 
	* @Exception Exception
	 */
	public String paging() throws Exception{
		List<PublicInterest> list = publicInterestService.listPaging(page);
		dataMap.put("publicInterestList", list);
		return SUCCESS;
	}
	
	public String getPageTotal() throws Exception{
		Integer pageTotal = publicInterestService.getPageTotal(page);
		dataMap.put("pageTotal", pageTotal);
		return SUCCESS;
	}
	
	/**
	* 获得焦点图片 
	* @author wangyachao
	* @return
	* @throws Exception String   
	* @throws 
	*/
	public String getFacus() throws Exception{
		List<File> publicPicList = fileService.getFileByApp(FinalUtil.PUBLIC_CODE);
		dataMap.put("publicPicList", publicPicList);
		return SUCCESS;
	}
	public Page getModel() {
		return page;
	}
	public Page getPage() {
		return page;
	}
	public void setPage(Page page) {
		this.page = page;
	}
	
}
