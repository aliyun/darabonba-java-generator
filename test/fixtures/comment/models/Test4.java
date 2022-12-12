// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.tea.*;

/**
  * @deprecated : Test4 is deprecated.
 */
public class Test4 extends TeaModel {
    /**
     * <p>The ID of the destination security group to be referenced in security group rule N.</p>
     * <br>
     * <p>*   At least one of `DestGroupId`, `DestCidrIp`, `Ipv6DestCidrIp`, and `DestPrefixListId` must be specified.</p>
     * <p>*   If `DestGroupId` is specified but `DestCidrIp` is not specified, the `NicType` parameter must be set to intranet.</p>
     * <p>*   If both `DestGroupId` and `DestCidrIp` are specified, `DestCidrIp` takes precedence.</p>
     * <br>
     * <p>Valid values of N: 1 to 100.</p>
     * <br>
     * <p>Take note of the following items:</p>
     * <br>
     * <p>*   For advanced security groups, security groups cannot be used as authorization objects.</p>
     * <p>*   For each basic security group, a maximum of 20 security groups can be used as authorization objects.</p>
     */
    @NameInMap("test")
    @Deprecated
    @Validation(required = true)
    public String test;

    /**
     * <p>test2 desc</p>
     */
    @NameInMap("test2")
    @Deprecated
    @Validation(required = true)
    public String test2;

    public static Test4 build(java.util.Map<String, ?> map) throws Exception {
        Test4 self = new Test4();
        return TeaModel.build(map, self);
    }

    public Test4 setTest(String test) {
        this.test = test;
        return this;
    }
    public String getTest() {
        return this.test;
    }

    public Test4 setTest2(String test2) {
        this.test2 = test2;
        return this;
    }
    public String getTest2() {
        return this.test2;
    }

}
