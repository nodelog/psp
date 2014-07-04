package com.psp.web.action.user;

import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.net.ftp.FTPClient;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.FileService;
import com.psp.service.SoftwareService;
import com.psp.util.FinalUtil;
import com.psp.util.FtpUpload;
import com.psp.util.Page;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Category;
import com.psp.web.domain.File;
import com.psp.web.domain.Software;
import com.psp.web.domain.SoftwareLog;

public class SoftwareAction extends BaseAction implements ModelDriven<Software> {
	private static final long serialVersionUID = 403251256703866605L;
	private Software software;
	private SoftwareService softwareService;
	private FtpUpload ftpUpload;
	private java.io.File softwareFile;
	private java.io.File softwareImage;
	private String filename;
	private Integer imageId;
	private Integer categoryId;
	private FileService fileService;
	private Integer currentPage;
	private Integer type;

	public void setFileService(FileService fileService) {
		this.fileService = fileService;
	}

	public void setFtpUpload(FtpUpload ftpUpload) {
		this.ftpUpload = ftpUpload;
	}

	public void setSoftwareService(SoftwareService softwareService) {
		this.softwareService = softwareService;
	}

	public String softwareIndex() {
		List<File> picFilm = softwareService.loadPic();
		request.put("fileList", picFilm);
		List<Category> categoryList = softwareService.loadCategory();
		Integer myUploadCount = softwareService.getPageTotal(getSessionUser(),
				FinalUtil.SOFTWARE_FILE);
		Integer myLinkCount = softwareService.getPageTotal(getSessionUser(),
				FinalUtil.SOFTWARE_LINK);
		request.put("categoryList", categoryList);
		request.put("myUploadCount", myUploadCount);
		request.put("myLinkCount", myLinkCount);
		return render("softwareIndex");
	}

	public String loadShareLink() {
		List<Category> categoryList = softwareService.loadCategory();
		request.put("categoryList", categoryList);
		return render("shareLink");
	}

	public String uploadSoftware() {
		String path = FinalUtil.FTP_SERVER_URL + FinalUtil.SOFTWARE_DIR;
		String ftpFilename = buildNewFileName(filename);
		ftpUpload.uploadFile(path, ftpFilename, softwareFile,
				FTPClient.BINARY_FILE_TYPE);
		if (software.getName() == null) {
			software.setName(filename.length() > 32 ? filename.substring(0, 32)
					: filename);
		} else {
			String name = software.getName();
			software.setName(name.length() > 32 ? name.substring(0, 32) : name);
		}
		software.setSize(getFileSize(softwareFile));
		software.setStatus(FinalUtil.SOFTWARE_FILE);
		software.setUploadTime(new Timestamp(System.currentTimeMillis()));
		software.setUrl(FinalUtil.SOFTWARE_DIR + "/" + ftpFilename);
		software.setUser(getSessionUser());
		software.setGrade(0D);
		Category category = new Category();
		category.setId(categoryId);
		software.setCategory(category);
		softwareService.addSoftware(software, imageId);
		return SUCCESS;
	}

	public String uploadImage() {
		String path = FinalUtil.FTP_SERVER_URL + FinalUtil.SOFTWARE_DIR;
		String ftpFilename = buildNewFileName(filename);
		ftpUpload.uploadFile(path, ftpFilename, softwareImage,
				FTPClient.BINARY_FILE_TYPE);
		File imageFile = new File();
		imageFile.setApp(FinalUtil.SOFTWARE_CODE);
		imageFile.setName(filename);
		imageFile.setSize(getFileSize(softwareImage));
		imageFile.setTime(new Timestamp(System.currentTimeMillis()));
		imageFile.setStatus(FinalUtil.FILE_NORMAL);
		imageFile.setUrl(FinalUtil.SOFTWARE_DIR + "/" + ftpFilename);
		File uploadFile = fileService.uploadFile(imageFile);
		dataMap.put("imageFile", uploadFile);
		return SUCCESS;
	}

	public String shareLink() {
		software.setUser(getSessionUser());
		software.setCategory(new Category(categoryId));
		software.setGrade(0D);
		software.setUploadTime(new Timestamp(System.currentTimeMillis()));
		software.setStatus(FinalUtil.SOFTWARE_LINK);
		softwareService.addSoftware(software);
		dataMap.put("result", FinalUtil.SUCCESS);
		return SUCCESS;
	}

	// 加载资源列表
	public String loadList() {
		Page page = new Page();
		page.setCurrent(currentPage > 0 ? currentPage : 1);
		if (categoryId != null) {
			Category category = softwareService.getCategoryById(categoryId);
			if (category != null) {
				request.put("categoryName", category.getName());
				request.put("categoryId", category.getId());
				List<Software> list = softwareService
						.listPaging(category, page);
				request.put("softwareList", list);
				return render("softwareList");
			} else {
				return "error";
			}
		} else {
			List<Software> listPaging = softwareService.listPaging(
					getSessionUser(), page, type);
			if (type == FinalUtil.SOFTWARE_FILE) {
				request.put("title", "我的上传");
			} else {
				request.put("title", "我的链接");
			}
			request.put("softwareList", listPaging);
			return render("userSoftwareList");
		}
	}
	public String viewSoftware(){
		software.setUser(getSessionUser());
		softwareService.addView(software);// 添加浏览记录
		return SUCCESS;
	}
	public String loadDetail() {
		software.setUser(getSessionUser());
		Software softwareDetail = softwareService.findSoftwareById(software
				.getId());
		int myGrade = softwareService.getGradeByUser(software);
		List<SoftwareLog> softwareLog = softwareService.getLogBySoftware(softwareDetail);
		int viewCount = 0;
		int downloadCount = 0;
		int gradeCount = 0;
		int commonCount = 0;
		for (SoftwareLog log : softwareLog) {
			if (log.getAction() == FinalUtil.SOFTWARE_VIEW) {
				viewCount++;
			} else if (log.getAction() == FinalUtil.SOFTWARE_DOWNLOAD) {
				downloadCount++;
			} else if (log.getAction() == FinalUtil.SOFTWARE_GRADE) {
				gradeCount++;
			} else if (log.getAction() == FinalUtil.SOFTWARE_COMMONT) {
				commonCount++;
			}
		}
		request.put("myGrade", myGrade);
		request.put("viewCount", viewCount == 0 ? 0 : viewCount);
		request.put("downloadCount", downloadCount == 0 ? 0 : downloadCount);
		request.put("gradeCount", gradeCount == 0 ? 0 : gradeCount);
		request.put("commonCount", commonCount == 0 ? 0 : commonCount);
		request.put("software", softwareDetail);
		return render("softwareDetail");
	}

	// 评分
	public String graded() {
		software.setUser(getSessionUser());
		softwareService.addGrade(software);
		return SUCCESS;
	}

	public Software getModel() {
		if (software == null) {
			software = new Software();
		}
		return software;
	}

	public java.io.File getSoftwareFile() {
		return softwareFile;
	}

	public void setSoftwareFile(java.io.File softwareFile) {
		this.softwareFile = softwareFile;
	}

	public java.io.File getSoftwareImage() {
		return softwareImage;
	}

	public void setSoftwareImage(java.io.File softwareImage) {
		this.softwareImage = softwareImage;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public Integer getImageId() {
		return imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}


}
