// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.tea.*;

public class MyModel extends TeaModel {
    @NameInMap("stringfield")
    @Validation(required = true)
    public String stringfield;

    @NameInMap("longtest")
    @Validation(required = true)
    public Long longtest;

    @NameInMap("_double")
    @Validation(required = true)
    public Double _double;

    @NameInMap("bytesTest")
    @Validation(required = true)
    public byte[] bytesTest;

    @NameInMap("stringarrayfield")
    @Validation(required = true)
    public java.util.List<String> stringarrayfield;

    @NameInMap("mapfield")
    @Validation(required = true)
    public java.util.Map<String, String> mapfield;

    @NameInMap("realName")
    @Deprecated
    @Validation(required = true, pattern = "[a-z0-9]{1,50}", maxLength = 50, minLength = 40)
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
