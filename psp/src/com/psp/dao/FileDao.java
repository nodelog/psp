package com.psp.dao;

import java.util.List;

import com.psp.web.domain.File;

public interface FileDao {
	/**
	 * 根据应用模块获得相应的资源文件
	 * 
	 * @author wangyachao
	 * @return List<File>   
	 * @throws 
	 */
	List<File> getFileByApp(int appCode);

	List<File> getFileByApp(int appCode, int appId);

	Integer uploadFile(File file);
	File getFileById(Integer id);
	void updateFileAppId(Integer id,Integer appId);
	void updateFileAppId(File file);
}
