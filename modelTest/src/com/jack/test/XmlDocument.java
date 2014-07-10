package com.jack.test;

import java.io.File;

public interface XmlDocument {
    /**
     * 建立XML文档
     * 
     * @param fileName
     *            文件全路径名称
     */
    public void createXml(String fileName);

    /**
     * 解析XML文档
     * 
     * @param fileName
     *            文件全路径名称
     */
    public void parserXml(String fileName,File parseFile)  throws Exception ;
}
