package com.jack.test;

public class ParseXmlTest {
    public static void main(String[] args) {
        XmlDocumentImpl xmlParser = new XmlDocumentImpl();
        String xmlFile = "src/service-model.xml";
        xmlParser.parserXml(xmlFile);
    }
}
