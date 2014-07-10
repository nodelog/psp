package com.jack.test;

import java.io.File;

public class ParseXmlTest {
    public static void main(String[] args) throws Exception {
        XmlDocumentImpl xmlParser = new XmlDocumentImpl();
        String xmlFile = "src/service-model.xml";
        File tableFile = new File("src/table.txt");
        xmlParser.parserXml(xmlFile,tableFile);
    }
}
