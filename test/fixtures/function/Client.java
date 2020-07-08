// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;


public class Client {

    public static void hello() throws Exception {
        return ;
    }

    public static java.util.Map<String, String> helloMap() throws Exception {
        java.util.Map<String, String> m = new java.util.HashMap<>();
        m.put("test", "test");
        return TeaConverter.merge(String.class,
            TeaConverter.buildMap(
                new TeaPair("key", "value"),
                new TeaPair("key-1", "value-1")
            ),
            m
        );
    }

    /**
     * annotation test
     */
    public static java.util.List<java.util.Map<String, String>> helloArrayMap() throws Exception {
        return java.util.Arrays.asList(
            TeaConverter.buildMap(
                new TeaPair("key", "value")
            )
        );
    }

    public static void helloParams(String a, String b) throws Exception {
        return ;
    }
}
