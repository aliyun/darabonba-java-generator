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
        String ms = JSONUitls.stringify(m);
        Object ma = JSONUitls.parseJSON(ms);
        String arrStr = "[1,2,3,4]";
        Object arr = JSONUitls.parseJSON(arrStr);
        Object res = JSONUitls.readPath(m, "$.key1.key2");
    }

    public static void envTest(java.util.List<String> args) throws Exception {
        String es = System.getenv("TEST");
    }

    public static void main(String[] args_) throws Exception {
        java.util.List<String> args = java.util.Arrays.asList(args_);
        Integer a = 1;
        String b = (String)(a);
        Integer f = (Integer)(b);
        Long g = (Long)(b);
        Long h = (Long)(b);
        Float n = (Float)(b);
        Double o = (Double)(b);
        if ((Boolean)(args.get(2))) {
            String data = (String)(args.get(2));
            Object test = data;
            java.util.Map<String, String> maps = TeaConverter.buildMap(
                new TeaPair("key", "value")
            );
            java.util.Map<String, Object> obj = (Map<String, Object>)(maps);
        }

        if (!(null == a)) {
            return ;
        }

        Thread.Sleep(a);
        String defaultVal = (String)(args.get(0) == null ? args.get(0) : args.get(1));
        if (defaultVal == b) {
            return ;
        }

    }
}
