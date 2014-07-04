package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.DocumentDao;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Document;
import com.psp.web.domain.DocumentLog;
import com.psp.web.domain.User;

public class DocumentDaoImpl extends BaseDao<Document> implements DocumentDao {

    public Document findDocumentByName(String name) {
        // TODO Auto-generated method stub
        return null;
    }

    public Document findDocumentById(Integer id) {
        Document document = super.getEntityById(new Document(), id);
        return document;
    }

    public void addDocument(Document document) {
        super.addEntity(document);
    }

    @SuppressWarnings("unchecked")
    public List<Document> listPaging(Page page) {
        init();
        int index = (page.getCurrent() - 1) * page.getEach();
        hql = "from Document as e where e.status!=:status order by uploadTime desc";
        query = session.createQuery(hql);
        query.setInteger("status", FinalUtil.DOCUMENT_DELETE);
        query.setFirstResult(index);
        query.setMaxResults(page.getEach());
        List<Document> objectList = query.list();
        return objectList;
    }

    public void deleteDocument(Document document) {
        // TODO Auto-generated method stub

    }

    public Integer getPageTotal() {
        init();
        hql = "select count(*) from Document e where e.status!=:status";
        query = session.createQuery(hql);
        query.setInteger("status", FinalUtil.DOCUMENT_DELETE);
        Long count = (Long) query.uniqueResult();
        return count != null ? count.intValue() : 0;
    }

    public void updateDocument(Document document, int id) {
        // TODO Auto-generated method stub

    }

    public Integer getPageTotal(User user) {
        init();
        hql = "select count(*) from Document e where e.user=:user and e.status!=:status";
        query = session.createQuery(hql);
        query.setEntity("user", user);
        query.setInteger("status", FinalUtil.DOCUMENT_DELETE);
        Long count = (Long) query.uniqueResult();
        return count != null ? count.intValue() : 0;
    }

    public Integer getPageTotal(Category category) {
        init();
        hql = "select count(*) from Document e where e.category=:category and e.status!=:status";
        query = session.createQuery(hql);
        query.setEntity("category", category);
        query.setInteger("status", FinalUtil.DOCUMENT_DELETE);
        Long count = (Long) query.uniqueResult();
        return count != null ? count.intValue() : 0;
    }

    @SuppressWarnings("unchecked")
    public List<Document> listPaging(Page page, User user) {
        init();
        int index = (page.getCurrent() - 1) * page.getEach();
        hql = "from Document as e where e.user=:user and e.status!=:status order by uploadTime desc";
        query = session.createQuery(hql);
        query.setEntity("user", user);
        query.setInteger("status", FinalUtil.DOCUMENT_DELETE);
        query.setFirstResult(index);
        query.setMaxResults(page.getEach());
        List<Document> objectList = query.list();
        return objectList;
    }

    @SuppressWarnings("unchecked")
    public List<Document> listPaging(Page page, Category category) {
        init();
        int index = (page.getCurrent() - 1) * page.getEach();
        hql = "from Document as e where e.category=:category and e.status!=:status order by uploadTime desc";
        query = session.createQuery(hql);
        query.setEntity("category", category);
        query.setInteger("status", FinalUtil.DOCUMENT_DELETE);
        query.setFirstResult(index);
        query.setMaxResults(page.getEach());
        List<Document> objectList = query.list();
        return objectList;
    }

    public void addLog(DocumentLog documentLog) {
        init();
        hibernate.save(documentLog);
    }

}
