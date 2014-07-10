package com.jack.java;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Test {
    public static void main(String[] args) {
        File file =  new File("src/com/jack/java/test.txt");
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader(file));
            String str = null;
            int index1 = 0;
            int index2 = 0;
            StringBuffer sb = new StringBuffer("table list:\n");
            Set<String> tableSet = new HashSet<String>();
            while ((str = br.readLine()) != null) {
                if (str.contains("getDAO()") ){
                    index1 = str.indexOf("=")+1;
                    index2 = str.indexOf("DAOImpl.getDAO()");
                    String temp = str.substring(index1, index2).replaceAll("//", "").trim();
                    tableSet.add(temp);
                } 
            }
            System.out.println("count:"+tableSet.size());
            for (String string : tableSet) {
                System.out.println(string);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        
        
//        String strr = "  UserLeagueMatchRecordDAOImpl.getDAO()";
//        System.out.println(strr.indexOf("=")+1);
//        System.out.println(strr.substring(0,strr.indexOf("DAOImpl.getDAO()")).trim());
//        Set<String> set = new HashSet<String>();
//        set.add("a");
//        set.add("a");
//        set.add("a");
//        set.add("a");
//        for (String str: set) {
//            System.out.println(str);
//        }
    }
}
