// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.test.models.*;

public class Client {

    public Client(Config config) {
    }

    public void hello() {
        TeaRequest request_ = new TeaRequest();
        request_.method = "GET";
        request_.pathname = "/";
        request_.headers = TeaConverter.buildMap(
            new TeaPair("host", "www.test.com")
        );
        if (true) {
            request_.headers.put("host", "www.test2.com");
        }

        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<>());

        Client.helloIf();
        return ;
    }

    public static void helloIf() {
        if (true) {
        }

        if (true) {
        } else if (true) {
        } else {
        }

    }

    public static void helloThrow() {
        throw new TeaException(new java.util.HashMap<>());
    }

    public static void helloForBreak() {

        for (String item : java.util.Arrays.asList(
                "1",
                "2"
            )) {
            break;
        }
    }

    public static void helloWhile() {

        while (true) {
            break;
        }
    }

    public static void helloDeclare() {
        String hello = "world";
        String helloNull = null;
        hello = "hehe";
    }
}
