// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.test.models.*;
import com.aliyun.demo.*;

public class Client {

    public okhttp3.Request _vid;
    public okhttp3.URL _url;
    public Client(okhttp3.Request request, okhttp3.URL url) throws Exception {
        this._vid = request;
        this._url = url;
    }


    public void test(okhttp3.Request test1, okhttp3.URL test2) throws Exception {
        com.aliyun.demo.Client oss = new com.aliyun.demo.Client(test1);
        M m = M.build(TeaConverter.buildMap(
            new TeaPair("a", test1),
            new TeaPair("b", test2)
        ));
        this._vid = test1;
        this._url = test2;
    }

    public okhttp3.Response testHttpRequest(okhttp3.Request req) throws Exception {
        return Client.testHttpRequestWith("test", req);
    }

    public static okhttp3.Response testHttpRequestWith(String method, okhttp3.Request req) throws Exception {
    }

    public static okhttp3.Request testHttpHeader(String method, okhttp3.Headers headers) throws Exception {
    }

    public okhttp3.Request testHttpHeaderWith(okhttp3.Headers headers) throws Exception {
        return Client.testHttpHeader("test", headers);
    }
}
