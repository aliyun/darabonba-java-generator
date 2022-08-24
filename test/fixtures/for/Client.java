// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;

public class Client {

    public static com.import.models.Response describeClusterResources(com.import.Client client, String id) throws Exception {
        return client.describeResources(id);
    }

    public static void main(String[] args_) throws Exception {
        java.util.List<String> args = java.util.Arrays.asList(args_);
        com.import.Client client = new com.import.Client();
        com.import.models.Response response = Client.describeClusterResources(client, args.get(0));
        java.util.List<com.import.models.Response.ResponseBody> resources = response.body;
        for (com.import.models.Response.ResponseBody resource : resources) {
            resource.resourceType;
        }
        java.util.List<Integer> numberArray = java.util.Arrays.asList(
            1,
            2
        );
        Integer sum = 0;
        for (Integer a : numberArray) {
            sum = a;
        }
    }
}
