package com.psp.dao.impl;

import java.util.List;

import com.psp.dao.SkillDao;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.domain.Category;
import com.psp.web.domain.Skill;
import com.psp.web.domain.SkillTalk;
import com.psp.web.domain.User;

public class SkillDaoImpl extends BaseDao<Skill> implements SkillDao {

    public Skill findSkillByName(String name) {
        // TODO Auto-generated method stub
        return null;
    }

    public Skill findSkillById(Integer id) {
        Skill skill = super.getEntityById(new Skill(), id);
        return skill;
    }

    public void addSkill(Skill skill) {
        hibernate.saveOrUpdate(skill);
    }

    public List<Skill> listPaging(Page page) {
        init();
        int index = (page.getCurrent() - 1) * page.getEach();
        hql = "from Skill as e where e.status!=:status order by createTime desc";
        query = session.createQuery(hql);
        query.setInteger("status", FinalUtil.SKILL_DELETE);
        query.setFirstResult(index);
        query.setMaxResults(page.getEach());
        List<Skill> objectList = query.list();
        return objectList;
    }

    public List<Skill> listPaging(Page page, User user) {
        init();
        int index = (page.getCurrent() - 1) * page.getEach();
        hql = "from Skill as e where e.user=:user and e.status!=:status order by createTime desc";
        query = session.createQuery(hql);
        query.setEntity("user", user);
        query.setInteger("status", FinalUtil.SKILL_DELETE);
        query.setFirstResult(index);
        query.setMaxResults(page.getEach());
        List<Skill> objectList = query.list();
        return objectList;
    }

    public List<Skill> listPaging(Page page, Category category) {
        init();
        int index = (page.getCurrent() - 1) * page.getEach();
        hql = "from Skill as e where e.category=:category and e.status!=:status order by createTime desc";
        query = session.createQuery(hql);
        query.setEntity("category", category);
        query.setInteger("status", FinalUtil.SKILL_DELETE);
        query.setFirstResult(index);
        query.setMaxResults(page.getEach());
        List<Skill> objectList = query.list();
        return objectList;
    }

    public void deleteSkill(Skill skill) {
        // TODO Auto-generated method stub

    }

    public Integer getPageTotal(Page page) {
        init();
        hql = "select count(*) from Skill e where e.status!=:status";
        query = session.createQuery(hql);
        query.setInteger("status", FinalUtil.SKILL_DELETE);
        Long count = (Long) query.uniqueResult();
        return count != null ? count.intValue() : 0;
    }

    public Integer getPageTotal(Page page, Category category) {
        init();
        hql = "select count(*) from Skill e where e.category=:category and e.status!=:status";
        query = session.createQuery(hql);
        query.setEntity("category", category);
        query.setInteger("status", FinalUtil.SKILL_DELETE);
        Long count = (Long) query.uniqueResult();
        return count != null ? count.intValue() : 0;
    }

    public Integer getPageTotal(Page page, User user) {
        init();
        hql = "select count(*) from Skill e where e.user=:user and e.status!=:status";
        query = session.createQuery(hql);
        query.setEntity("user", user);
        query.setInteger("status", FinalUtil.SKILL_DELETE);
        Long count = (Long) query.uniqueResult();
        return count != null ? count.intValue() : 0;
    }

    public void updateSkill(Skill skill, int id) {

    }

    public void addSkillTalk(SkillTalk skillTalk) {
        init();
        hibernate.save(skillTalk);
    }

    @SuppressWarnings("unchecked")
    public List<SkillTalk> getSkillTalkBySkill(Skill skill, Integer action) {
        init();
        hql = "from SkillTalk e where e.skill=:skill and e.action=:action order by e.talkTime desc";
        query = session.createQuery(hql);
        query.setEntity("skill", skill);
        query.setInteger("action", action);
        List<SkillTalk> list = query.list();
        return list;
    }

    public Integer getGradeByUser(Skill skill) {
        init();
        hql = "select e.content from SkillTalk e where e.user=:user and e.skill=:skill and e.action=:action";
        query = session.createQuery(hql);
        query.setEntity("user", skill.getUser());
        query.setEntity("skill", skill);
        query.setInteger("action", FinalUtil.SKILL_GRADE);
        Object obj = query.uniqueResult();
        Double grade = Double.parseDouble((String) (obj == null ? "0" : obj));
        return grade.intValue();
    }

}
