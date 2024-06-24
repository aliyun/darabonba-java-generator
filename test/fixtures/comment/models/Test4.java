package com.aliyun.test.models;

import com.aliyun.tea.*;

/**
 * @deprecated Test4 is deprecated, use Test3 instead.
 */
@Deprecated
public class Test4 extends TeaModel {
    /**
     * <p>The natural language that is used to filter responses. For more information, visit <a href="https://tools.ietf.org/html/rfc7231">RFC 7231</a>. Valid values:</p>
     * <ul>
     * <li>zh-CN: Chinese</li>
     * <li>en-US: English</li>
     * <li>ja: Japanese</li>
     * </ul>
     * <p>Default value: zh-CN.</p>
     */
    @NameInMap("test")
    @Deprecated
    @Validation(required = true)
    public String test;

    /**
     * <p>test2 desc</p>
     */
    @NameInMap("test2")
    @Validation(required = true)
    public String test2;

    public static Test4 build(java.util.Map<String, ?> map) throws Exception {
        Test4 self = new Test4();
        return TeaModel.build(map, self);
    }

    @Deprecated
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
