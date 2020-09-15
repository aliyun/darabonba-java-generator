// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;


public class Client {

    public static void Sample(com.import.Client client) {
        com.import.models.RuntimeObject runtime = new com.import.models.RuntimeObject();
        com.import.models.Request request = com.import.models.Request.build(TeaConverter.buildMap(
            new TeaPair("accesskey", "accesskey"),
            new TeaPair("region", "region")
        ));
        client.print(runtime);
    }
}
