// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.tea.*;

/**
  TestModel
*/
public class Test1 extends TeaModel {
    /**
     * <p>test desc</p>
     */
    @NameInMap("test")
    @Validation(required = true)
    public String test;

    //model的test back comment
    /**
     * <p>test2 desc</p>
     */
    @NameInMap("test2")
    @Validation(required = true)
    public String test2;

    //model的test2 back comment
    public static Test1 build(java.util.Map<String, ?> map) throws Exception {
        Test1 self = new Test1();
        return TeaModel.build(map, self);
    }

    public Test1 setTest(String test) {
        this.test = test;
        return this;
    }
    public String getTest() {
        return this.test;
    }

    public Test1 setTest2(String test2) {
        this.test2 = test2;
        return this;
    }
    public String getTest2() {
        return this.test2;
    }

}
