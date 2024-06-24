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
    @Validation(required = true, pattern = "[a-z0-9]{1,50}", maxLength = 2147483647, minLength = 40)
    public String name;

    @NameInMap("submodel")
    @Validation(required = true)
    public Submodel submodel;

    @NameInMap("longSubmodelTest")
    @Validation(required = true)
    public LongSubmodelTest longSubmodelTest;

    @NameInMap("object")
    @Validation(required = true)
    public java.util.Map<String, ?> object;

    @NameInMap("numberfield")
    @Validation(required = true, maximum = 9007199254740991D, minimum = 50)
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

    @Deprecated
    public MyModel setName(String name) {
        this.name = name;
        return this;
    }
    public String getName() {
        return this.name;
    }

    public MyModel setSubmodel(Submodel submodel) {
        this.submodel = submodel;
        return this;
    }
    public Submodel getSubmodel() {
        return this.submodel;
    }

    public MyModel setLongSubmodelTest(LongSubmodelTest longSubmodelTest) {
        this.longSubmodelTest = longSubmodelTest;
        return this;
    }
    public LongSubmodelTest getLongSubmodelTest() {
        return this.longSubmodelTest;
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

    public static class Submodel extends TeaModel {
        @NameInMap("stringfield")
        @Validation(required = true)
        public String stringfield;

        public static Submodel build(java.util.Map<String, ?> map) throws Exception {
            Submodel self = new Submodel();
            return TeaModel.build(map, self);
        }

        public Submodel setStringfield(String stringfield) {
            this.stringfield = stringfield;
            return this;
        }
        public String getStringfield() {
            return this.stringfield;
        }

    }

    public static class Copy extends TeaModel {
        @NameInMap("stringfield")
        @Validation(required = true)
        public String stringfield;

        public static Copy build(java.util.Map<String, ?> map) throws Exception {
            Copy self = new Copy();
            return TeaModel.build(map, self);
        }

        public Copy setStringfield(String stringfield) {
            this.stringfield = stringfield;
            return this;
        }
        public String getStringfield() {
            return this.stringfield;
        }

    }

    public static class LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 extends TeaModel {
        @NameInMap("stringfield")
        @Validation(required = true)
        public String stringfield;

        @NameInMap("copy")
        @Validation(required = true)
        public Copy copy;

        public static LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 build(java.util.Map<String, ?> map) throws Exception {
            LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 self = new LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5();
            return TeaModel.build(map, self);
        }

        public LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 setStringfield(String stringfield) {
            this.stringfield = stringfield;
            return this;
        }
        public String getStringfield() {
            return this.stringfield;
        }

        public LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 setCopy(Copy copy) {
            this.copy = copy;
            return this;
        }
        public Copy getCopy() {
            return this.copy;
        }

    }

    public static class LongSubmodelTest6Copy extends TeaModel {
        @NameInMap("stringfield")
        @Validation(required = true)
        public String stringfield;

        public static LongSubmodelTest6Copy build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest6Copy self = new LongSubmodelTest6Copy();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest6Copy setStringfield(String stringfield) {
            this.stringfield = stringfield;
            return this;
        }
        public String getStringfield() {
            return this.stringfield;
        }

    }

    public static class LongSubmodelTest6 extends TeaModel {
        @NameInMap("stringfield")
        @Validation(required = true)
        public String stringfield;

        @NameInMap("copy")
        @Validation(required = true)
        public LongSubmodelTest6Copy copy;

        public static LongSubmodelTest6 build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest6 self = new LongSubmodelTest6();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest6 setStringfield(String stringfield) {
            this.stringfield = stringfield;
            return this;
        }
        public String getStringfield() {
            return this.stringfield;
        }

        public LongSubmodelTest6 setCopy(LongSubmodelTest6Copy copy) {
            this.copy = copy;
            return this;
        }
        public LongSubmodelTest6Copy getCopy() {
            return this.copy;
        }

    }

    public static class LongSubmodelTest5 extends TeaModel {
        @NameInMap("longxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5")
        @Validation(required = true)
        public LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 longxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5;

        @NameInMap("longSubmodelTest6")
        @Validation(required = true)
        public LongSubmodelTest6 longSubmodelTest6;

        public static LongSubmodelTest5 build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest5 self = new LongSubmodelTest5();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest5 setLongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5(LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 longxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5) {
            this.longxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 = longxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5;
            return this;
        }
        public LongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5 getLongxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5() {
            return this.longxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSubmodelTest5;
        }

        public LongSubmodelTest5 setLongSubmodelTest6(LongSubmodelTest6 longSubmodelTest6) {
            this.longSubmodelTest6 = longSubmodelTest6;
            return this;
        }
        public LongSubmodelTest6 getLongSubmodelTest6() {
            return this.longSubmodelTest6;
        }

    }

    public static class LongSubmodelTest4LongSubmodelTest5 extends TeaModel {
        @NameInMap("longSubmodelTest5")
        @Validation(required = true)
        public LongSubmodelTest5 longSubmodelTest5;

        public static LongSubmodelTest4LongSubmodelTest5 build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest4LongSubmodelTest5 self = new LongSubmodelTest4LongSubmodelTest5();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest4LongSubmodelTest5 setLongSubmodelTest5(LongSubmodelTest5 longSubmodelTest5) {
            this.longSubmodelTest5 = longSubmodelTest5;
            return this;
        }
        public LongSubmodelTest5 getLongSubmodelTest5() {
            return this.longSubmodelTest5;
        }

    }

    public static class LongSubmodelTest4 extends TeaModel {
        @NameInMap("longSubmodelTest5")
        @Validation(required = true)
        public LongSubmodelTest4LongSubmodelTest5 longSubmodelTest5;

        public static LongSubmodelTest4 build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest4 self = new LongSubmodelTest4();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest4 setLongSubmodelTest5(LongSubmodelTest4LongSubmodelTest5 longSubmodelTest5) {
            this.longSubmodelTest5 = longSubmodelTest5;
            return this;
        }
        public LongSubmodelTest4LongSubmodelTest5 getLongSubmodelTest5() {
            return this.longSubmodelTest5;
        }

    }

    public static class LongSubmodelTest3 extends TeaModel {
        @NameInMap("longSubmodelTest4")
        @Validation(required = true)
        public LongSubmodelTest4 longSubmodelTest4;

        public static LongSubmodelTest3 build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest3 self = new LongSubmodelTest3();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest3 setLongSubmodelTest4(LongSubmodelTest4 longSubmodelTest4) {
            this.longSubmodelTest4 = longSubmodelTest4;
            return this;
        }
        public LongSubmodelTest4 getLongSubmodelTest4() {
            return this.longSubmodelTest4;
        }

    }

    public static class LongSubmodelTest2 extends TeaModel {
        @NameInMap("longSubmodelTest3")
        @Validation(required = true)
        public LongSubmodelTest3 longSubmodelTest3;

        public static LongSubmodelTest2 build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest2 self = new LongSubmodelTest2();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest2 setLongSubmodelTest3(LongSubmodelTest3 longSubmodelTest3) {
            this.longSubmodelTest3 = longSubmodelTest3;
            return this;
        }
        public LongSubmodelTest3 getLongSubmodelTest3() {
            return this.longSubmodelTest3;
        }

    }

    public static class LongSubmodelTest1 extends TeaModel {
        @NameInMap("longSubmodelTest2")
        @Validation(required = true)
        public LongSubmodelTest2 longSubmodelTest2;

        public static LongSubmodelTest1 build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest1 self = new LongSubmodelTest1();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest1 setLongSubmodelTest2(LongSubmodelTest2 longSubmodelTest2) {
            this.longSubmodelTest2 = longSubmodelTest2;
            return this;
        }
        public LongSubmodelTest2 getLongSubmodelTest2() {
            return this.longSubmodelTest2;
        }

    }

    public static class LongSubmodelTest extends TeaModel {
        @NameInMap("longSubmodelTest1")
        @Validation(required = true)
        public LongSubmodelTest1 longSubmodelTest1;

        public static LongSubmodelTest build(java.util.Map<String, ?> map) throws Exception {
            LongSubmodelTest self = new LongSubmodelTest();
            return TeaModel.build(map, self);
        }

        public LongSubmodelTest setLongSubmodelTest1(LongSubmodelTest1 longSubmodelTest1) {
            this.longSubmodelTest1 = longSubmodelTest1;
            return this;
        }
        public LongSubmodelTest1 getLongSubmodelTest1() {
            return this.longSubmodelTest1;
        }

    }

}
