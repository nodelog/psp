/**
 * 
 */
package com.psp.util;

import org.aspectj.lang.JoinPoint;

/**
 * 类名称：LoggerImpl
 * 类描述：日志实现类
 * 创建人：王亚超
 * 创建时间：2014-3-15 下午11:52:10
 * @version 1.0
 */
public class LoggerImpl implements Logger {
    private org.apache.log4j.Logger logger;
    
    public void init() {
        this.logger = org.apache.log4j.Logger.getRootLogger();
    }

    public void debug(String paramString) {
        logger.debug(paramString);
    }

    public void error(String paramString) {
        logger.error(paramString);

    }

    public void fatal(String paramString) {
        logger.fatal(paramString);

    }

    public void info(String paramString) {
        logger.info(paramString);

    }

    public void warn(String paramString) {
        logger.warn(paramString);

    }

    public void logging(JoinPoint joinPoint) {
        
    }
    
    public static void main(String[] args) {
        LoggerImpl log = new LoggerImpl();
        log.init();
        log.info("test log print file bin===========");
        log.debug(null);
    }

}
