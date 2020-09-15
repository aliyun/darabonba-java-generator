// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;


public class Client {

    public static void hello() {
        return ;
    }

    public static java.util.Map<String, String> helloMap() {
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
    public static java.util.List<java.util.Map<String, String>> helloArrayMap() {
        return java.util.Arrays.asList(
            TeaConverter.buildMap(
                new TeaPair("key", "value")
            )
        );
    }

    public static void helloParams(String a, String b) {
        return ;
    }
}
