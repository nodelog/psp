package com.psp.web.action.user;

import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.net.ftp.FTPClient;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.FileService;
import com.psp.service.MediaService;
import com.psp.util.FinalUtil;
import com.psp.util.FtpUpload;
import com.psp.util.Page;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Category;
import com.psp.web.domain.File;
import com.psp.web.domain.Media;
import com.psp.web.domain.User;

public class MediaAction extends BaseAction implements ModelDriven<Media> {
	private static final long serialVersionUID = 6879473162831004559L;
	private Media media;
	private String filename;
	private java.io.File film;
	private java.io.File image;// 视频的背景图片
	private Integer imageId;
	private java.io.File music;
	private String target;
	private MediaService mediaService;
	private FileService fileService;
	private FtpUpload ftpUpload;
	private Integer currentPage;
	private String scope;

	public void setFtpUpload(FtpUpload ftpUpload) {
		this.ftpUpload = ftpUpload;
	}

	public void setFileService(FileService fileService) {
		this.fileService = fileService;
	}
	
	public void setMediaService(MediaService mediaService) {
		this.mediaService = mediaService;
	}

	public String mediaIndex() throws Exception {
		//视频数据
		Category filmCategory = new Category();
		filmCategory.setName(FinalUtil.MEDIA_FILM);
		filmCategory.setType(FinalUtil.TYPE_MEDIA);
		Integer allFilmCount = mediaService.getTotatlByType(filmCategory);
		User user = getSessionUser();
		Integer userFilmCount = mediaService.getTotatlByUser(filmCategory, user);
		request.put("allFilmCount", allFilmCount);
		request.put("userFilmCount", userFilmCount);
		//音乐数据
		Category musicCategory = new Category();
		musicCategory.setName(FinalUtil.MEDIA_MUSIC);
		musicCategory.setType(FinalUtil.TYPE_MEDIA);
		Integer allMusicCount = mediaService.getTotatlByType(musicCategory);
		Integer userMusicCount = mediaService.getTotatlByUser(musicCategory, user);
		request.put("allMusicCount", allMusicCount);
		request.put("userMusicCount", userMusicCount);
		//目标转换
		return render("mediaIndex");
	}
	public String loadPicFilm(){
		
		List<File> picFilm = mediaService.loadPicFilm();
		request.put("fileList", picFilm);
		request.put("fileServer", getCookie("FILE_SERVER_URL"));
		return renderCommon("foucsPicture");
	}
	public String listpaging(){
		Page page = new Page();
		page.setCurrent(currentPage);
		Category category = new Category();
		category.setType(FinalUtil.TYPE_MEDIA);
		String listName;
		if("film".equals(scope)){
			category.setName(FinalUtil.MEDIA_FILM);
			listName="filmList";
		}else{
			category.setName(FinalUtil.MEDIA_MUSIC);
			listName="musicList";
		}
		List<Media> mediaList = mediaService.listPaging(page, category);
		request.put(listName, mediaList);
		
		return render(scope+"List");
	}
	public String listpagingByUser(){
		Page page = new Page();
		page.setCurrent(currentPage);
		Category category = new Category();
		category.setType(FinalUtil.TYPE_MEDIA);
		String listName;
		if("userFilm".equals(scope)){
			category.setName(FinalUtil.MEDIA_FILM);
			listName="userFilmList";
		}else{
			category.setName(FinalUtil.MEDIA_MUSIC);
			listName="userMusicList";
		}
		List<Media> mediaList = mediaService.listPaging(page, category,getSessionUser());
		request.put(listName, mediaList);
		
		return render(scope+"List");
	}

	public String uploadFilm() {
		String path = FinalUtil.FTP_SERVER_URL + FinalUtil.MEDIA_DIR;
		String ftpFilename = buildNewFileName(filename);
		ftpUpload.uploadFile(path, ftpFilename, film,
				FTPClient.BINARY_FILE_TYPE);
		if (media.getName() == null) {
			media.setName(filename.length()>32?filename.substring(0,32):filename);
		}else{
			String name =media.getName();
			media.setName(name.length()>32?name.substring(0,32):name);
		}
		media.setSize(getFileSize(film));
		String minName = filename.toLowerCase();
		if (minName.indexOf(".mp4") > 0 || minName.indexOf(".webm") > 0
				|| minName.indexOf(".ogg") > 0) {
			media.setStatus(FinalUtil.MEDIA_PLAY_ENBLE);
		} else {
			media.setStatus(FinalUtil.MEDIA_PLAY_UNENBLE);
		}
		media.setUploadTime(new Timestamp(System.currentTimeMillis()));
		media.setUrl(FinalUtil.MEDIA_DIR + "/" + ftpFilename);
		media.setUser(getSessionUser());
		media.setGrade(0D);
		mediaService.addMedia(media, imageId);
		return SUCCESS;
	}
	public String uploadMusic() {
		String path = FinalUtil.FTP_SERVER_URL + FinalUtil.MEDIA_DIR;
		String ftpFilename = buildNewFileName(filename);
		ftpUpload.uploadFile(path, ftpFilename, music,
				FTPClient.BINARY_FILE_TYPE);
		if (media.getName() == null) {
			media.setName(filename.length()>32?filename.substring(0,32):filename);
		}else{
			String name =media.getName();
			media.setName(name.length()>32?name.substring(0,32):name);
		}
		media.setSize(getFileSize(music));
		String minName = filename.toLowerCase();
		if (minName.indexOf(".mp3") > 0 || minName.indexOf(".wav") > 0
				|| minName.indexOf(".ogg") > 0) {
			media.setStatus(FinalUtil.MEDIA_PLAY_ENBLE);
		} else {
			media.setStatus(FinalUtil.MEDIA_PLAY_UNENBLE);
		}
		media.setUploadTime(new Timestamp(System.currentTimeMillis()));
		media.setUrl(FinalUtil.MEDIA_DIR + "/" + ftpFilename);
		media.setUser(getSessionUser());
		media.setGrade(0D);
		mediaService.addMedia(media);
		return SUCCESS;
	}

	public String uploadImage() {
		String path = FinalUtil.FTP_SERVER_URL + FinalUtil.MEDIA_DIR;
		String ftpFilename=buildNewFileName(filename);
		ftpUpload.uploadFile(path, ftpFilename, image,FTPClient.BINARY_FILE_TYPE);
		File imageFile = new File();
		imageFile.setApp(FinalUtil.MEDIA_CODE);
		imageFile.setName(filename);
		imageFile.setSize(getFileSize(image));
		imageFile.setTime(new Timestamp(System.currentTimeMillis()));
		imageFile.setStatus(FinalUtil.FILE_NORMAL);
		imageFile.setUrl(FinalUtil.MEDIA_DIR+"/"+ftpFilename);
		File uploadFile = fileService.uploadFile(imageFile);
		dataMap.put("imageFile", uploadFile);
		return SUCCESS;
	}

	public String render(String target) {
		this.target = target;
		return SUCCESS;
	}
	public String renderCommon(String target) {
		this.target = target;
		return "common";
	}

	public Media getModel() {
		if (media == null) {
			media = new Media();
		}
		return media;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public java.io.File getFilm() {
		return film;
	}

	public void setFilm(java.io.File film) {
		this.film = film;
	}

	public java.io.File getImage() {
		return image;
	}

	public void setImage(java.io.File image) {
		this.image = image;
	}

	public java.io.File getMusic() {
		return music;
	}

	public void setMusic(java.io.File music) {
		this.music = music;
	}

	public Integer getImageId() {
		return imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

}
