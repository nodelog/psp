package com.psp.service.impl;

import java.util.List;

import com.psp.dao.FileDao;
import com.psp.service.FileService;
import com.psp.util.FinalUtil;
import com.psp.web.domain.File;

public class FileServiceImpl implements FileService{
	private FileDao fileDao;
	public void setFileDao(FileDao fileDao) {
		this.fileDao = fileDao;
	}
	public List<File> getFileByApp(int appCode) {
		List<File> fileList = fileDao.getFileByApp(appCode);
		return fileList;
	}
	public List<File> getFileByApp(int appCode,int appId) {
		List<File> fileList = fileDao.getFileByApp(appCode,appId);
		return fileList;
	}
	public File uploadFile(File file) {
		Integer id = fileDao.uploadFile(file);		
		File fileById = fileDao.getFileById(id);
		return fileById; 
	}
	public void updateFileAppId(Integer id, Integer appId) {
		File fileById = fileDao.getFileById(id);
		fileById.setAppId(appId);
	}
	public File uploadHead(File file) {
		List<File> list = fileDao.getFileByApp(file.getApp(), file.getAppId());
		for (File fileDb : list) {
			fileDb.setStatus(FinalUtil.FILE_DELETE);
		}
		Integer id = fileDao.uploadFile(file);		
		File fileById = fileDao.getFileById(id);
		return fileById; 
	}
	
	
}
