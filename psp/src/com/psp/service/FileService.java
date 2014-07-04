package com.psp.service;

import java.util.List;

import com.psp.web.domain.File;

public interface FileService {
	/**
	* 根据应用模块获得相应的资源文件
	* @author wangyachao
	* @return List<File>   
	* @throws 
	*/
	List<File> getFileByApp(int appCode);
	List<File> getFileByApp(int appCode,int appId);
	File uploadFile(File file);
	File uploadHead(File file);
	void updateFileAppId(Integer id,Integer appId);
}
