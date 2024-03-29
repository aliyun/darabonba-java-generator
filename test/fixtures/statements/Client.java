// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.tea.interceptor.InterceptorChain;
import com.aliyun.tea.interceptor.RuntimeOptionsInterceptor;
import com.aliyun.tea.interceptor.RequestInterceptor;
import com.aliyun.tea.interceptor.ResponseInterceptor;
import com.aliyun.test.models.*;

public class Client {

    private final static InterceptorChain interceptorChain = InterceptorChain.create();

    public Client(Config config) throws Exception {
    }

    public void hello() throws Exception {
        TeaRequest request_ = new TeaRequest();
        request_.method = "GET";
        request_.pathname = "/";
        request_.headers = TeaConverter.buildMap(
            new TeaPair("host", "www.test.com")
        );
        if (true) {
            request_.headers.put("host", "www.test2.com");
        }

        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<String, Object>(), interceptorChain);

        Client.helloIf();
        return ;
    }

    public void addRuntimeOptionsInterceptor(RuntimeOptionsInterceptor interceptor) {
        interceptorChain.addRuntimeOptionsInterceptor(interceptor);
    }

    public void addRequestInterceptor(RequestInterceptor interceptor) {
        interceptorChain.addRequestInterceptor(interceptor);
    }

    public void addResponseInterceptor(ResponseInterceptor interceptor) {
        interceptorChain.addResponseInterceptor(interceptor);
    }

    public static void helloIf() throws Exception {
        if (true) {
        }

        if (true) {
        } else if (true) {
        } else {
        }

    }

    public static void helloThrow() throws Exception {
        throw new TeaException(new java.util.HashMap<>());
    }

    public static void helloForBreak() throws Exception {
        for (String item : java.util.Arrays.asList(
                "1",
                "2"
            )) {
            break;
        }
    }

    public static void helloWhile() throws Exception {

        while (true) {
            break;
        }
    }

    public static void helloDeclare() throws Exception {
        String hello = "world";
        String helloNull = null;
        hello = "hehe";
    }
}
