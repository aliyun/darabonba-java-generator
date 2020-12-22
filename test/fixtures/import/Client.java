// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.import;
import com.import.models.*;

public class Client {

    public static void Sample(com.import.Client client) throws Exception {
        RuntimeObject runtime = new RuntimeObject();
        Request request = Request.build(TeaConverter.buildMap(
            new TeaPair("accesskey", "accesskey"),
            new TeaPair("region", "region")
        ));
        client.print(runtime);
    }
}
