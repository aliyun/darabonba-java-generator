// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;


public class Client {

    public java.util.List<String> _id;
    public String _str;
    public Client(java.util.List<String> id, String str) {
        this._id = id;
        this._str = str;
    }


    public static void Sample(undefined.Client client) {
        undefined.models.RuntimeObject runtime = new undefined.models.RuntimeObject();
        undefined.models.Request request = undefined.models.Request.build(TeaConverter.buildMap(
            new TeaPair("accesskey", "accesskey"),
            new TeaPair("region", "region")
        ));
        client.print(runtime);
    }
}
