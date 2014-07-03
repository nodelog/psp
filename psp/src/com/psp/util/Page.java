package com.psp.util;

/**
 * 类名称：Page 类描述：分页信息 创建人：王亚超 创建时间：2014-3-30 下午8:16:34
 * 
 * @version 1.0
 */
public class Page {
	private Integer current = 1;// 当前页数
	private Integer total;// 总页数 =总数/each
	private Integer each = FinalUtil.PAGE_EACH;// 每页显示数量

	public Page() {
	}

	public Integer getCurrent() {
		return current;
	}

	public void setCurrent(Integer current) {
		this.current = current;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getEach() {
		return each;
	}

	public void setEach(Integer each) {
		this.each = each;
	}

	// 把总行数算成总页数
	public Integer getPageTotal() {
		int total = this.getTotal();
		int each = this.getEach();
		Integer count = total / each + (total % each == 0 ? 0 : 1);
		return count;
	}

}
