// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;

public class Client {

    public java.util.List<String> _id;
    public String _str;
    public Client(java.util.List<String> id, String str) throws Exception {
        this._id = id;
        this._str = str;
    }


    public static void Sample(com.import.Client client) throws Exception {
        com.import.models.RuntimeObject runtime = new com.import.models.RuntimeObject();
        com.import2.models.Request request = com.import2.models.Request.build(TeaConverter.buildMap(
            new TeaPair("accesskey", "accesskey"),
            new TeaPair("region", "region")
        ));
        client.print(runtime);
    }
}
