// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.import.*;
import com.import.models.*;
import undefined.*;
import undefined.models.*;

public class Client {

    public java.util.List<String> _id;
    public String _str;
    public Client(java.util.List<String> id, String str) throws Exception {
        this._id = id;
        this._str = str;
    }


    public static void Sample(com.import.Client client) throws Exception {
        RuntimeObject runtime = new RuntimeObject();
        Request request = Request.build(TeaConverter.buildMap(
            new TeaPair("accesskey", "accesskey"),
            new TeaPair("region", "region")
        ));
        client.print(runtime);
    }
}
