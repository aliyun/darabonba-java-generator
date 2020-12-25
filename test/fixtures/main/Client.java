// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;

public class Client {

    public static java.util.List<String> arrayData() throws Exception {
        java.util.List<String> configs = java.util.Arrays.asList(
            "a",
            "b",
            "c"
        );
        return configs;
    }

    public static String arrayAccess() throws Exception {
        java.util.List<String> configs = Client.arrayData();
        String config = configs.get(0);
        return config;
    }

    public static String hello() throws Exception {
        return Client.arrayAccess();
    }

    public static String main(String[] args_) throws Exception {
        java.util.List<String> args = java.util.Arrays.asList(args_);
        Client.hello();
        return args.get(1);
    }
}
