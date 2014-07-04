package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.FileDao;
import com.psp.util.FinalUtil;
import com.psp.web.domain.File;

public class FileDaoImpl extends BaseDao<File> implements FileDao{

	public List<File> getFileByApp(int appCode) {
		List<File> list = super.getFileByApp(appCode);
		return list;
	}
	@SuppressWarnings("unchecked")
	public List<File> getFileByApp(int appCode, int appId) {
		init();
		hql = "from File as e where e.appId=:appId and e.app=:app and e.status!=:status";
		query = session.createQuery(hql);
		query.setInteger("appId", appId);
		query.setInteger("app", appCode);
		query.setInteger("status", FinalUtil.FILE_DELETE);
		List<File> list = query.list();
		return list;
	}
	public Integer uploadFile(File file) {
		int id = super.addEntity(file);
		return id;
	}
	public File getFileById(Integer id) {
		init();
		hql = "from File e where e.id=:id and e.status!=:status";
		query = session.createQuery(hql);
		query.setInteger("id", id);
		query.setInteger("status", FinalUtil.FILE_DELETE);
		File file = (File) query.uniqueResult();
		return file;
	}
	
	public void updateFileAppId(Integer id, Integer appId) {
		File fileById = getFileById(id);
		fileById.setAppId(appId);
	}
	public void updateFileAppId(File file) {
		File fileById = getFileById(file.getId());
		if(file.getName()!=null&& !"".equals(file.getName())){
			fileById.setName(file.getName());
		}
		if(file.getUrl()!=null&& !"".equals(file.getUrl())){
			fileById.setUrl(file.getUrl());
		}
		if(file.getSize()!=null&& !"".equals(file.getSize())){
			fileById.setName(file.getSize());
		}
		if(file.getTime()!=null){
			fileById.setTime(file.getTime());
		}
		if(file.getStatus()!=null){
			fileById.setStatus(file.getStatus());
		}
		if(file.getApp()!=null){
			fileById.setApp(file.getApp());
		}
		if(file.getAppId()!=null){
			fileById.setAppId(file.getAppId());
		}
	}

}
