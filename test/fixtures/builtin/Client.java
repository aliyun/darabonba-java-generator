// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;

public class Client {

    public static void jsonTest(java.util.List<String> args) throws Exception {
        java.util.Map<String, Object> m = TeaConverter.buildMap(
            new TeaPair("key1", "test1"),
            new TeaPair("key2", "test2"),
            new TeaPair("key3", 3),
            new TeaPair("key4", TeaConverter.buildMap(
                new TeaPair("key5", 123),
                new TeaPair("key6", "321")
            ))
        );
        String ms = JSONUtils.stringify(m);
        Object ma = JSONUtils.parseJSON(ms);
        String arrStr = "[1,2,3,4]";
        Object arr = JSONUtils.parseJSON(arrStr);
        Object res = JSONUtils.readPath(m, "$.key1.key2");
    }

    public static void loggerTest(java.util.List<String> args) throws Exception {
        // $Logger.trace("test");
        System.out.println("test");
        System.out.println("test");
        System.out.println("test");
        System.out.println("test");
    }

    public static void envTest(java.util.List<String> args) throws Exception {
        String es = System.getenv("TEST");
    }

    public static void stringTest(java.util.List<String> args) throws Exception {
        String str = System.getenv("TEST").toString();
        long site = Long.parseLong(str);
        String fullStr = "cn-hangzhou, cn-shanghai";
        if (fullStr.equals("cn-hangzhou")) {
            args = fullStr.split(",");
        }

        if (fullStr.contains("hangzhou")) {
            int length = fullStr.length();
        }

        if (fullStr.startsWith("cn-")) {
        }

        if (fullStr.endsWith("cn-")) {
            int start = fullStr.indexOf("hangzhou");
            int end = start + 7;
            String region = fullStr.substring(start, end);
            String lowerRegion = region.toLowerCase();
            String upperRegion = region.toUpperCase();
        }

        String em = "xxx";
        if (em.isEmpty()) {
            return ;
        }

        String num = "32.01";
        int inum = Integer.parseInt(num) + 3;
        long lnum = Long.parseLong(num);
        float fnum = Float.parseFloat(num) + 1F;
        double dnum = Double.parseDouble(num) + 1D;
    }

    public static void main(String[] args) throws Exception {
        args[0];
        args[1];
        int a = 1;
        String b = a.toString();
        int f = ConverterUtils.parseInt(b);
        long g = ConverterUtils.parseInt(b);
        long h = ConverterUtils.parseLong(b);
        float n = ConverterUtils.parseFloat(b);
        double o = Double.parseDouble(b.toString());
        if (ConverterUtils.parseBoolean(args[2])) {
            String data = args[2].toString();
            Object test = data;
            java.util.Map<String, String> maps = TeaConverter.buildMap(
                new TeaPair("key", "value")
            );
            java.util.Map<String, Object> obj = (Map<String, Object>)(maps);
        }

        if (!(null == a)) {
            return ;
        }

        Thread.sleep(a);
        String defaultVal = args[0] == null ? args[0] : args[1].toString();
        if (defaultVal == b) {
            return ;
        }

    }
}
