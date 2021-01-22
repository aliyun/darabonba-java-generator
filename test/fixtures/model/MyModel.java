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
    public Number numberfield;

    @NameInMap("intfield")
    @Validation(required = true)
    public Integer intfield;

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

    public MyModel setStringfield(String stringfield) {
        this.stringfield = stringfield;
        return this;
    }
    public String getStringfield() {
        return this.stringfield;
    }

    public MyModel setLongtest(Long longtest) {
        this.longtest = longtest;
        return this;
    }
    public Long getLongtest() {
        return this.longtest;
    }

    public MyModel set_double(Double _double) {
        this._double = _double;
        return this;
    }
    public Double get_double() {
        return this._double;
    }

    public MyModel setBytesTest(byte[] bytesTest) {
        this.bytesTest = bytesTest;
        return this;
    }
    public byte[] getBytesTest() {
        return this.bytesTest;
    }

    public MyModel setStringarrayfield(java.util.List<String> stringarrayfield) {
        this.stringarrayfield = stringarrayfield;
        return this;
    }
    public java.util.List<String> getStringarrayfield() {
        return this.stringarrayfield;
    }

    public MyModel setMapfield(java.util.Map<String, String> mapfield) {
        this.mapfield = mapfield;
        return this;
    }
    public java.util.Map<String, String> getMapfield() {
        return this.mapfield;
    }

    public MyModel setName(String name) {
        this.name = name;
        return this;
    }
    public String getName() {
        return this.name;
    }

    public MyModel setSubmodel(MyModelSubmodel submodel) {
        this.submodel = submodel;
        return this;
    }
    public MyModelSubmodel getSubmodel() {
        return this.submodel;
    }

    public MyModel setObject(java.util.Map<String, ?> object) {
        this.object = object;
        return this;
    }
    public java.util.Map<String, ?> getObject() {
        return this.object;
    }

    public MyModel setNumberfield(Number numberfield) {
        this.numberfield = numberfield;
        return this;
    }
    public Number getNumberfield() {
        return this.numberfield;
    }

    public MyModel setIntfield(Integer intfield) {
        this.intfield = intfield;
        return this;
    }
    public Integer getIntfield() {
        return this.intfield;
    }

    public MyModel setReadable(java.io.InputStream readable) {
        this.readable = readable;
        return this;
    }
    public java.io.InputStream getReadable() {
        return this.readable;
    }

    public MyModel setRequest(TeaRequest request) {
        this.request = request;
        return this;
    }
    public TeaRequest getRequest() {
        return this.request;
    }

    public static class MyModelSubmodel extends TeaModel {
        @NameInMap("stringfield")
        @Validation(required = true)
        public String stringfield;

        public static MyModelSubmodel build(java.util.Map<String, ?> map) throws Exception {
            MyModelSubmodel self = new MyModelSubmodel();
            return TeaModel.build(map, self);
        }

        public MyModelSubmodel setStringfield(String stringfield) {
            this.stringfield = stringfield;
            return this;
        }
        public String getStringfield() {
            return this.stringfield;
        }

    }

}
