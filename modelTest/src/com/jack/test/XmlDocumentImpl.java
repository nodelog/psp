package com.jack.test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

public class XmlDocumentImpl implements XmlDocument {

    public void createXml(String fileName) {
        Document document = DocumentHelper.createDocument();
        Element employees = document.addElement("employees");
        Element employee = employees.addElement("employee");
        Element name = employee.addElement("name");
        name.setText("ddvip");
        Element sex = employee.addElement("sex");
        sex.setText("m");
        Element age = employee.addElement("age");
        age.setText("29");
        try {
            Writer fileWriter = new FileWriter(fileName);
            XMLWriter xmlWriter = new XMLWriter(fileWriter);
            xmlWriter.write(document);
            xmlWriter.close();
        } catch (IOException e) {

            System.out.println(e.getMessage());
        }

    }

    /**
     * 解析 service-model.xml文件
     */
    public void parserXml(String fileName) {
        File inputXml = new File(fileName);
        if (inputXml.exists()) {
            SAXReader saxReader = new SAXReader();
            try {
                Document document = saxReader.read(inputXml);
                List<Element> entitys = document.getRootElement().elements();// 根元素
                int i = 0;
                for (Element entity : entitys) {
                    if ("entity".equals(entity.getName())) {
                        System.out.println(entity.attributeValue("name"));
                        List<Element> columns = entity.elements();
                        for (Element column : columns) {
                            System.out.print(column.attributeValue("name")
                                    + " | ");
                        }
                        System.out.println();
                        // System.out.println("-------------------------------------------");
                    }
                }
                // for (Iterator i = entitys.elementIterator(); i.hasNext();) {
                // Element entity = (Element) i.next();
                // for (Iterator j = entity.elementIterator(); j.hasNext();) {
                // Element node = (Element) j.next();
                // System.out.println(node.getName() + ":"
                // + node.getText());
                // }
                //
                // }
            } catch (DocumentException e) {
                System.out.println("出错了：\n" + e.getMessage());
            }
        } else {
            System.out.println("xml 文件不存在，请检查文件完整路径是否正确");
        }
    }

}
