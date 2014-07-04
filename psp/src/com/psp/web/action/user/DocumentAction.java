package com.psp.web.action.user;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.net.ftp.FTPClient;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.DocumentService;
import com.psp.util.FinalUtil;
import com.psp.util.FtpUpload;
import com.psp.util.Page;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Category;
import com.psp.web.domain.Document;

public class DocumentAction extends BaseAction implements ModelDriven<Document> {

	private static final long serialVersionUID = 6804668655943862364L;
	private Document document;
	private DocumentService documentService;
	private FtpUpload ftpUpload;
	private Integer categoryId;// 分类id
	private String type;// 请求类型
	private Integer currentPage;
	private java.io.File documentFile;
	private String filename;


	public void setFtpUpload(FtpUpload ftpUpload) {
		this.ftpUpload = ftpUpload;
	}

	public void setDocumentService(DocumentService documentService) {
		this.documentService = documentService;
	}

	// 首页加载
	public String documentIndex() {
		// 加载分类
		Integer pageTotal = documentService.getPageTotal();
		request.put("pageTotal", pageTotal);
		Integer myTotal = documentService.getPageTotal(
				getSessionUser());
		request.put("myTotal", myTotal);
		List<Category> categoryList = documentService.loadCategory();
		request.put("categoryList", categoryList);
		return render("documentIndex");
	}

	public String loadList() {
		Page page = new Page();
		page.setCurrent(currentPage > 0 ? currentPage : 1);
		List<Document> list = new ArrayList<Document>();
		if ("all".equals(type)) {// 不区分类别
		// List<Category> categoryList = documentService.loadCategory();
		// request.put("categoryList", categoryList);
			list = documentService.listPaging(page);
		} else if ("user".equals(type)) {// 用户的发布
			list = documentService.listPaging(page, getSessionUser());
			request.put("documentList", list);
			return render("userList");
		} else {// 按类别
			Category category = new Category();
			category.setId(categoryId);
			list = documentService.listPaging(page, category);
		}
		request.put("categoryId", categoryId);
		Integer pageTotal = documentService.getPageTotal();
		request.put("pageTotal", pageTotal);
		List<Category> categoryList = documentService.loadCategory();
		request.put("categoryList", categoryList);
		request.put("documentList", list);
		return render("documentList");
	}
	public String uploadDocument() {
		String path = FinalUtil.FTP_SERVER_URL + FinalUtil.DOCUMENT_DIR;//ftp上传路径
		String ftpFilename = buildNewFileName(filename);
		ftpUpload.uploadFile(path, ftpFilename, documentFile,
				FTPClient.BINARY_FILE_TYPE);
		if (document.getName() == null) {
			document.setName(filename.length() > 32 ? filename.substring(0, 32)
					: filename);
		} else {
			String name = document.getName();
			document.setName(name.length() > 32 ? name.substring(0, 32) : name);
		}
		document.setSize(getFileSize(documentFile));
		document.setStatus(FinalUtil.DOCUMENT_ENBLE);
		document.setUploadTime(new Timestamp(System.currentTimeMillis()));
		document.setUrl(FinalUtil.DOCUMENT_DIR + "/" + ftpFilename);
		document.setUser(getSessionUser());
		document.setGrade(0D);
		document.setViewCount(0);
		Category category = new Category();
		category.setId(categoryId);
		document.setCategory(category);
		documentService.addDocument(document);
		return SUCCESS;
	}

	// 添加页面加载
	public String loadAddPage() {
		List<Category> categoryList = documentService.loadCategory();
		request.put("categoryList", categoryList);
		return render("addDocument");
	}

	// 浏览量增加
	public String viewDocument() {
		document.setUser(getSessionUser());
		documentService.addView(document);// 添加浏览记录
		return SUCCESS;
	}

	public Document getModel() {
		if (document == null) {
			document = new Document();
		}
		return document;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public java.io.File getDocumentFile() {
		return documentFile;
	}

	public void setDocumentFile(java.io.File documentFile) {
		this.documentFile = documentFile;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

}
