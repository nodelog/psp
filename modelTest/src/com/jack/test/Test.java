package com.jack.test;

public class Test {
    public static void main(String[] args) {
        //nanotime test
//        long s = System.nanoTime();
//        System.out.println(System.nanoTime() - s);
//        System.out.println(System.nanoTime());
//        System.out.println(System.currentTimeMillis());
        
        //StringBuilder TEST
        StringBuilder builder = new StringBuilder();
//        builder.append("111111111111");
//        builder.append("2222222222222");
//        System.out.println(builder.toString());
//        System.out.println(builder.length());
//        builder.delete(0, builder.length());
        builder.append("33333333333");
        builder.append("44444444444");
        builder.append("5555555557896");
        int index = builder.length();
        System.out.println(index);
        builder.delete(index-1,index);
        System.out.println(builder.toString());
    }
}
