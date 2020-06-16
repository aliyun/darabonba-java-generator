// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.tea.*;

public class MyModel extends TeaModel {
    @NameInMap("stringfield")
    @Validation(required = true)
    public String stringfield;

    @NameInMap("stringarrayfield")
    @Validation(required = true)
    public java.util.List<String> stringarrayfield;

    @NameInMap("mapfield")
    @Validation(required = true)
    public java.util.Map<String, String> mapfield;

    @NameInMap("realName")
    @Validation(required = true)
    public String name;

    @NameInMap("submodel")
    @Validation(required = true)
    public MyModelSubmodel submodel;

    @NameInMap("object")
    @Validation(required = true)
    public java.util.Map<String, ?> object;

    @NameInMap("numberfield")
    @Validation(required = true)
    public Integer numberfield;

    @NameInMap("readable")
    @Validation(required = true)
    public java.io.InputStream readable;

    @NameInMap("request")
    @Validation(required = true)
    public TeaRequest request;

    public static MyModel build(java.util.Map<String, ?> map) throws Exception {
        MyModel self = new MyModel();
        return TeaModel.build(map, self);
    }

    public static class MyModelSubmodel extends TeaModel {
        @NameInMap("stringfield")
        @Validation(required = true)
        public String stringfield;

        public static MyModelSubmodel build(java.util.Map<String, ?> map) throws Exception {
            MyModelSubmodel self = new MyModelSubmodel();
            return TeaModel.build(map, self);
        }

    }

}
