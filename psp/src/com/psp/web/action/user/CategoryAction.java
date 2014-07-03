package com.psp.web.action.user;

import java.util.ArrayList;
import java.util.List;

import com.psp.service.CategoryService;
import com.psp.util.FinalUtil;
import com.psp.web.action.BaseAction;
import com.psp.web.domain.Category;

public class CategoryAction extends BaseAction {
	private static final long serialVersionUID = -3852110296464295011L;
	private String type;// 类别的分类名称
	private CategoryService categoryService;

	public void setCategoryService(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	public String loadCategoryByType() throws Exception {
		int typeValue = switchType();
		List<Category> categoryList = categoryService.loadCategoryByType(typeValue);
		List<Category> minCategoryList = new ArrayList<>();
		for (Category category : categoryList) {
			Category minCategory = new Category();
			minCategory.setId(category.getId());
			minCategory.setName(category.getName());
			minCategoryList.add(minCategory);
		}
		dataMap.put("categoryList", minCategoryList);
		return SUCCESS;
	}

	private int switchType() {
		int value = 0;
		switch (type) {
		case "problem":
			value = FinalUtil.TYPE_PROBLEM;
			break;

		default:
			value = 1;
			break;
		}

		return value;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
