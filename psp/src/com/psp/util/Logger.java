package com.psp.util;

import org.aspectj.lang.JoinPoint;

/**
 * 类名称：Logger
 * 类描述：日志接口
 * 创建人：王亚超
 * 创建时间：2014-3-15 下午11:52:10
 * @version 1.0
 */
public interface Logger{
    public abstract void debug(String paramString);

    public abstract void info(String paramString);

    public abstract void warn(String paramString);

    public abstract void error(String paramString);

    public abstract void fatal(String paramString);
    
    public abstract void logging(JoinPoint joinPoint);
}
