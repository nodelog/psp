package com.psp.service;

import java.util.List;

import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Document;
import com.psp.web.domain.User;

public interface DocumentService {
	/**
	 * 
	* 根据名字字段查询对应实体的对象
	* @param name 实体名字字段
	* @param entity 实体名称
	* @return 泛型 实体对象
	* @Exception 异常对象
	 */
	Document findDocumentByName(String name);
	/**
	 * 
	 * 根据主键字段查询对应实体的对象
	 * @param name 实体名字字段
	 * @param entity 实体名称
	 * @return 泛型 实体对象
	 * @Exception 异常对象
	 */
	Document findDocumentById(Integer id);
	
	/**
	* 添加实体
	* @author wangyachao
	* @param document
	* @return String   
	* @throws 
	*/
	void addDocument(Document document);
	/**
	* 分页列表数据
	* @author wangyachao
	* @param page
	* @return List<Document>   
	* @throws 
	*/
	List<Document> listPaging(Page page);
	List<Document> listPaging(Page page,User user);
	List<Document> listPaging(Page page,Category category);
	/**
	* 删除实体
	* @author wangyachao
	* @param document
	* @throws 
	*/
	void deleteDocument(Document document);
	/**
	 * 查询总页数
	 * @author wangyachao
	 * @param page
	 * @return Integer   
	 * @throws 
	 */
	Integer getPageTotal();
	Integer getPageTotal(User user);
	/**
	* 更新实体
	* @author wangyachao
	* @param document
	* @param id 
	* @throws 
	*/
	void updateDocument(Document document, int id);
	List<Category> loadCategory();
	void addView(Document document);
}
