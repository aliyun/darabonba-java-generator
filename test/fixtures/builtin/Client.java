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
        String fullStr = "cn-hangzhou, cn-shanghai";
        if (.equals("cn-hangzhou")) {
            args = fullStr.split(",");
        }

        if (fullStr.contains("hangzhou")) {
            Integer length = fullStr.length();
        }

        if (fullStr.startsWith("cn-")) {
        }

        if (fullStr.endsWith("cn-")) {
            Integer start = fullStr.indexOf("hangzhou");
            Integer end = start + 7;
            String region = fullStr.substring(start, end);
            String lowerRegion = region.toLowerCase();
            String upperRegion = region.toUpperCase();
        }

        String em = "xxx";
        if (em.isEmpty()) {
            return ;
        }

        String num = "32.01";
        Integer inum = Integer.parseInt(num) + 3;
        Long lnum = Long.parseLong(num);
        Float fnum = Float.parseFloat(num) + 1F;
        Double dnum = Double.parseDouble(num) + 1D;
    }

    public static void main(String[] args_) throws Exception {
        java.util.List<String> args = java.util.Arrays.asList(args_);
        Integer a = 1;
        String b = a.toString();
        Integer f = ConverterUtils.parseInt(b);
        Long g = ConverterUtils.parseInt(b);
        Long h = ConverterUtils.parseLong(b);
        Float n = ConverterUtils.parseFloat(b);
        Double o = Double.parseDouble(b.toString());
        if (ConverterUtils.parseBoolean(args.get(2))) {
            String data = args.get(2).toString();
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
        String defaultVal = args.get(0) == null ? args.get(0) : args.get(1).toString();
        if (defaultVal == b) {
            return ;
        }

    }
}
