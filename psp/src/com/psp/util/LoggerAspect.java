/**
 * 
 */
package com.psp.util;

import org.aspectj.lang.JoinPoint;

/**
 * 类名称：Logger
 * 类描述：日志切面
 * 创建人：王亚超
 * 创建时间：2014-3-15 下午11:52:10
 * @version 1.0
 */
public class LoggerAspect {
    private org.apache.log4j.Logger logger;
    private StringBuffer buffer;

    public void init() {
        this.logger = org.apache.log4j.Logger.getRootLogger();
        buffer = new StringBuffer();
    }

    public void before(JoinPoint joinPoint) {
        buffer.setLength(0);
        buffer.append("transaction begin in ");
        buffer.append(joinPoint.getSignature().getName());
        logger.info(buffer.toString());
    }

    public void after(JoinPoint joinPoint) {
        buffer.setLength(0);
        buffer.append("transaction commit in ");
        buffer.append(joinPoint.getSignature().getName());
        logger.info(buffer.toString());
    }

    public void throwing(JoinPoint joinPoint, Throwable exception) {
        buffer.setLength(0);
        buffer.append("\n Exception report begion***************************");
        buffer.append("\n exception method <");
        buffer.append(joinPoint.getTarget().getClass().getName());
        buffer.append(".");
        buffer.append(joinPoint.getSignature().getName());
        buffer.append(">\n exception class:");
        buffer.append(exception.getClass());
        buffer.append("\n exception message:");
        buffer.append(exception.getMessage());
        buffer.append("\n Exception report end******************************\n");
        logger.error(buffer.toString());
    }
}
