package com.aliyun.test.models;

import com.aliyun.tea.*;

/**
 * <b>description</b> :
 * <p>TestModel2</p>
 */
public class Test2 extends TeaModel {
    // model的test front comment
    /**
     * <p>test desc</p>
     */
    @NameInMap("test")
    @Validation(required = true)
    public String test;

    // model的test front comment
    /**
     * <p>test2 desc</p>
     */
    @NameInMap("test2")
    @Validation(required = true)
    public String test2;

    public static Test2 build(java.util.Map<String, ?> map) throws Exception {
        Test2 self = new Test2();
        return TeaModel.build(map, self);
    }

    public Test2 setTest(String test) {
        this.test = test;
        return this;
    }
    public String getTest() {
        return this.test;
    }

    public Test2 setTest2(String test2) {
        this.test2 = test2;
        return this;
    }
    public String getTest2() {
        return this.test2;
    }

}
