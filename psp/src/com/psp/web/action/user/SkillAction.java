package com.psp.web.action.user;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.opensymphony.xwork2.ModelDriven;
import com.psp.service.SkillService;
import com.psp.util.FinalUtil;
import com.psp.util.Page;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Category;
import com.psp.web.domain.Skill;

public class SkillAction extends BaseAction implements ModelDriven<Skill> {
	private static final long serialVersionUID = -7064631909238282928L;
	private Skill skill;
	private SkillService skillService;
	private Integer categoryId;// 分类id
	private String type;// 请求类型
	private Integer currentPage;

	public void setSkillService(SkillService skillService) {
		this.skillService = skillService;
	}

	// 首页加载
	public String skillIndex() {
		// 加载分类
		Integer pageTotal = skillService.getPageTotal(new Page());
		request.put("pageTotal", pageTotal);
		Integer myTotal = skillService.getPageTotal(new Page(),
				getSessionUser());
		request.put("myTotal", myTotal);
		List<Category> categoryList = skillService.loadCategory();
		request.put("categoryList", categoryList);
		return render("skillIndex");
	}

	// 添加页面加载
	public String loadAddPage() {
		List<Category> categoryList = skillService.loadCategory();
		request.put("categoryList", categoryList);
		return render("addSkill");
	}

	// 编辑页面加载
	public String loadEditPage() {
		List<Category> categoryList = skillService.loadCategory();
		request.put("categoryList", categoryList);
		skill = skillService.findSkillById(skill.getId());
		request.put("skill", skill);
		return render("editSkill");
	}

	// 分页数据加载
	public String loadList() {
		Page page = new Page();
		page.setCurrent(currentPage > 0 ? currentPage : 1);
		List<Skill> list = new ArrayList<Skill>();
		if ("all".equals(type)) {// 不区分类别
			List<Category> categoryList = skillService.loadCategory();
			request.put("categoryList", categoryList);
			list = skillService.listPaging(page);
		} else if ("user".equals(type)) {// 用户的发布
			list = skillService.listPaging(page, getSessionUser());
			request.put("skillList", list);
			return render("userList");
		} else {// 按类别
			Category category = new Category();
			category.setId(categoryId);
			list = skillService.listPaging(page, category);
		}
		request.put("categoryId", categoryId);
		Integer pageTotal = skillService.getPageTotal(new Page());
		request.put("pageTotal", pageTotal);
		List<Category> categoryList = skillService.loadCategory();
		request.put("categoryList", categoryList);
		request.put("skillList", list);
		return render("skillList");
	}

	// 查看详细
	public String skillDetial() {
		skill.setUser(getSessionUser());
		Integer myGrade = skillService.getGradeByUser(skill);
		request.put("myGrade", myGrade);
		skill = skillService.findSkillById(skill.getId());
		request.put("skill", skill);
		return render("skillDetial");
	}

	public String save() {
		skill.setCreateTime(new Timestamp(System.currentTimeMillis()));
		skill.setUser(getSessionUser());
		skill.setCategory(new Category(categoryId));
		skill.setGrade(0D);
		skill.setStatus(FinalUtil.SKILL_ENBLE);
		skill.setViewCount(0);
		skillService.addSkill(skill);
		return SUCCESS;
	}
	public String edit() {
		skill.setCategory(new Category(categoryId));
		skillService.editSkill(skill);
		return SUCCESS;
	}

	// 浏览量增加
	public String viewSkill() {
		skill.setUser(getSessionUser());
		skillService.addView(skill);// 添加浏览记录
		return SUCCESS;
	}

	// 评分
	public String graded() {
		skill.setUser(getSessionUser());
		skillService.addGrade(skill);
		return SUCCESS;
	}

	public Skill getModel() {
		if (skill == null) {
			skill = new Skill();
		}
		return skill;
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

}
