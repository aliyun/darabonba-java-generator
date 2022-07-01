// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.tea.*;

public class M extends TeaModel {
    @NameInMap("a")
    public okhttp3.Request a;

    @NameInMap("b")
    public okhttp3.URL b;

    public static M build(java.util.Map<String, ?> map) throws Exception {
        M self = new M();
        return TeaModel.build(map, self);
    }

    public M setA(okhttp3.Request a) {
        this.a = a;
        return this;
    }
    public okhttp3.Request getA() {
        return this.a;
    }

    public M setB(okhttp3.URL b) {
        this.b = b;
        return this;
    }
    public okhttp3.URL getB() {
        return this.b;
    }

}
