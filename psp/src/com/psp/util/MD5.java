package com.psp.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 类名称：MD5
 * 类描述：MD5加密工具
 * 创建人：王亚超
 * 创建时间：2014-3-13 下午8:38:05
 * @version 1.0
 */
public class MD5 {
	 public static String getMD5Str(String str) {
	        String encryStr = "";
	        try {
	            if (str != null) {
	                MessageDigest m = MessageDigest.getInstance("MD5");
	                m.update(str.getBytes());
	                encryStr = (new BigInteger(m.digest())).toString(16)
	                        .toUpperCase();
	            }
	        } catch (NoSuchAlgorithmException e) {
	            e.printStackTrace();
	        }
	        return encryStr;
	    }
}
