package com.psp.util;

import java.util.Random;

/**
 * 类名称：RandomCode 类描述：随机码生成器  创建人：王亚超 创建时间：2014-3-22 下午7:04:19
 * 
 * @version 1.0
 */
public class RandomCode {
	private static char[] codeArray = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
			'I', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
			'X', 'Y', 'Z' };
	private static Random random = new Random();

	public static String getRandomCode(int length) {
		String result = "";
		for (int i = 0; i < length; i++) {
			result+=codeArray[random.nextInt(codeArray.length)];
		}
		return result;
	}
	
}
