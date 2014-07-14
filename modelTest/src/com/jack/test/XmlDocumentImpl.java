package com.jack.test;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
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
     * 
     * @throws Exception
     */
    public void parserXml(String fileName, File tableFile) throws Exception {
        File inputXml = new File(fileName);
        if (inputXml.exists()) {
            SAXReader saxReader = new SAXReader();
            try {
                Document document = saxReader.read(inputXml);
                List<Element> entitys = document.getRootElement().elements();// 根元素
                int i = 0;
                StringBuilder builder = new StringBuilder();
                if (!tableFile.exists()) {
                    tableFile.createNewFile();
                }
                FileWriter fw = new FileWriter(tableFile.getAbsoluteFile());
                BufferedWriter bw = new BufferedWriter(fw);
                for (Element entity : entitys) {
                    if ("entity".equals(entity.getName())) {
                        if (builder.length() > 0) {
                            builder.delete(0, builder.length());
                        }
                        builder
                                .append(entity.attributeValue("table") != null ? entity
                                        .attributeValue("table")
                                        : entity.attributeValue("name"));
                        builder.append("(");
                        List<Element> columns = entity.elements();
                        for (Element column : columns) {
                            if ("column".equals(column.getName())) {
                                builder.append(column.attributeValue("name"));
                                builder.append(" ");
                                if (column.attributeValue("type") != null) {
                                    builder.append(column
                                            .attributeValue("type"));
                                    builder.append(" ");
                                }
                                if (column.attributeValue("db-size") != null) {
                                    builder.append("(");
                                    builder.append(column
                                            .attributeValue("db-size"));
                                    builder.append(") ");
                                }
                                if ("true".equals(column
                                        .attributeValue("db-not-null"))) {
                                    builder.append("not null ");
                                }
                                if ("true".equals(column
                                        .attributeValue("primary"))) {
                                    builder.append("primary key ");
                                }
                                if ("native".equals(column
                                        .attributeValue("id-type"))) {
                                    builder.append("auto_increment ");
                                }
                                builder.append(",");
                            }
                        }
                        builder.delete(builder.length() - 2, builder.length());
                        builder.append(");\n\r");
                        bw.write(builder.toString());
                    }
                }
                bw.close();
                System.out.println("xml文件解析成功");
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
