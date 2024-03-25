// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.tea.*;

public class ComplexRequest extends TeaModel {
    @NameInMap("accessKey")
    @Validation(required = true)
    public String accessKey;

    @NameInMap("moduleModelMap")
    @Validation(required = true)
    public java.util.Map<String, com.import.models.Request> moduleModelMap;

    @NameInMap("subModelMap")
    @Validation(required = true)
    public java.util.Map<String, Config.ConfigSubM> subModelMap;

    @NameInMap("complexList")
    @Validation(required = true)
    public java.util.List<java.util.List<java.util.Map<String, String>>> complexList;

    @NameInMap("complexList2")
    @Validation(required = true)
    public java.util.List<ComplexRequestComplexList1> complexList1;

    @NameInMap("complexList2")
    @Validation(required = true)
    public java.util.List<java.util.List<java.util.List<ComplexRequestComplexList2>>> complexList2;

    @NameInMap("complexList3")
    @Validation(required = true)
    public java.util.List<java.util.List<java.util.List<Config>>> complexList3;

    /**
     * <p>Body</p>
     * <p>body</p>
     * 
     * <strong>example:</strong>
     * <p>Body</p>
     */
    @NameInMap("Body")
    @Validation(required = true)
    public java.io.InputStream body;

    @NameInMap("UserPsssrivileges")
    public java.util.Map<String, java.util.List<java.util.Map<String, String>>> userTest;

    /**
     * <p>Strs</p>
     * 
     * <strong>example:</strong>
     * <p>Strs</p>
     */
    @NameInMap("Strs")
    @Validation(required = true)
    public java.util.List<String> strs;

    /**
     * <p>header</p>
     */
    @NameInMap("header")
    @Validation(required = true)
    public ComplexRequestHeader header;

    @NameInMap("num")
    @Validation(required = true)
    public Number num;

    @NameInMap("client")
    @Validation(required = true)
    public com.import.Client client;

    @NameInMap("configs")
    @Validation(required = true)
    public ComplexRequestConfigs configs;

    /**
     * <p>Part</p>
     */
    @NameInMap("Part")
    public java.util.List<ComplexRequestPart> part;

    public static ComplexRequest build(java.util.Map<String, ?> map) {
        ComplexRequest self = new ComplexRequest();
        return TeaModel.build(map, self);
    }

    public ComplexRequest setAccessKey(String accessKey) {
        this.accessKey = accessKey;
        return this;
    }
    public String getAccessKey() {
        return this.accessKey;
    }

    public ComplexRequest setModuleModelMap(java.util.Map<String, com.import.models.Request> moduleModelMap) {
        this.moduleModelMap = moduleModelMap;
        return this;
    }
    public java.util.Map<String, com.import.models.Request> getModuleModelMap() {
        return this.moduleModelMap;
    }

    public ComplexRequest setSubModelMap(java.util.Map<String, Config.ConfigSubM> subModelMap) {
        this.subModelMap = subModelMap;
        return this;
    }
    public java.util.Map<String, Config.ConfigSubM> getSubModelMap() {
        return this.subModelMap;
    }

    public ComplexRequest setComplexList(java.util.List<java.util.List<java.util.Map<String, String>>> complexList) {
        this.complexList = complexList;
        return this;
    }
    public java.util.List<java.util.List<java.util.Map<String, String>>> getComplexList() {
        return this.complexList;
    }

    public ComplexRequest setComplexList1(java.util.List<ComplexRequestComplexList1> complexList1) {
        this.complexList1 = complexList1;
        return this;
    }
    public java.util.List<ComplexRequestComplexList1> getComplexList1() {
        return this.complexList1;
    }

    public ComplexRequest setComplexList2(java.util.List<java.util.List<java.util.List<ComplexRequestComplexList2>>> complexList2) {
        this.complexList2 = complexList2;
        return this;
    }
    public java.util.List<java.util.List<java.util.List<ComplexRequestComplexList2>>> getComplexList2() {
        return this.complexList2;
    }

    public ComplexRequest setComplexList3(java.util.List<java.util.List<java.util.List<Config>>> complexList3) {
        this.complexList3 = complexList3;
        return this;
    }
    public java.util.List<java.util.List<java.util.List<Config>>> getComplexList3() {
        return this.complexList3;
    }

    public ComplexRequest setBody(java.io.InputStream body) {
        this.body = body;
        return this;
    }
    public java.io.InputStream getBody() {
        return this.body;
    }

    public ComplexRequest setUserTest(java.util.Map<String, java.util.List<java.util.Map<String, String>>> userTest) {
        this.userTest = userTest;
        return this;
    }
    public java.util.Map<String, java.util.List<java.util.Map<String, String>>> getUserTest() {
        return this.userTest;
    }

    public ComplexRequest setStrs(java.util.List<String> strs) {
        this.strs = strs;
        return this;
    }
    public java.util.List<String> getStrs() {
        return this.strs;
    }

    public ComplexRequest setHeader(ComplexRequestHeader header) {
        this.header = header;
        return this;
    }
    public ComplexRequestHeader getHeader() {
        return this.header;
    }

    public ComplexRequest setNum(Number num) {
        this.num = num;
        return this;
    }
    public Number getNum() {
        return this.num;
    }

    public ComplexRequest setClient(com.import.Client client) {
        this.client = client;
        return this;
    }
    public com.import.Client getClient() {
        return this.client;
    }

    public ComplexRequest setConfigs(ComplexRequestConfigs configs) {
        this.configs = configs;
        return this;
    }
    public ComplexRequestConfigs getConfigs() {
        return this.configs;
    }

    public ComplexRequest setPart(java.util.List<ComplexRequestPart> part) {
        this.part = part;
        return this;
    }
    public java.util.List<ComplexRequestPart> getPart() {
        return this.part;
    }

    public static class ComplexRequestComplexList1 extends TeaModel {
        @NameInMap("Name")
        public String name;

        @NameInMap("Code")
        public Integer code;

        public static ComplexRequestComplexList1 build(java.util.Map<String, ?> map) {
            ComplexRequestComplexList1 self = new ComplexRequestComplexList1();
            return TeaModel.build(map, self);
        }

        public ComplexRequestComplexList1 setName(String name) {
            this.name = name;
            return this;
        }
        public String getName() {
            return this.name;
        }

        public ComplexRequestComplexList1 setCode(Integer code) {
            this.code = code;
            return this;
        }
        public Integer getCode() {
            return this.code;
        }

    }

    public static class ComplexRequestComplexList2 extends TeaModel {
        @NameInMap("Name")
        public String name;

        @NameInMap("Code")
        public Integer code;

        public static ComplexRequestComplexList2 build(java.util.Map<String, ?> map) {
            ComplexRequestComplexList2 self = new ComplexRequestComplexList2();
            return TeaModel.build(map, self);
        }

        public ComplexRequestComplexList2 setName(String name) {
            this.name = name;
            return this;
        }
        public String getName() {
            return this.name;
        }

        public ComplexRequestComplexList2 setCode(Integer code) {
            this.code = code;
            return this;
        }
        public Integer getCode() {
            return this.code;
        }

    }

    public static class ComplexRequestHeader extends TeaModel {
        /**
         * <p>Body</p>
         * 
         * <strong>example:</strong>
         * <p>Content</p>
         */
        @NameInMap("Content")
        @Validation(required = true)
        public String content;

        public static ComplexRequestHeader build(java.util.Map<String, ?> map) {
            ComplexRequestHeader self = new ComplexRequestHeader();
            return TeaModel.build(map, self);
        }

        public ComplexRequestHeader setContent(String content) {
            this.content = content;
            return this;
        }
        public String getContent() {
            return this.content;
        }

    }

    public static class ComplexRequestConfigs extends TeaModel {
        @NameInMap("key")
        @Validation(required = true)
        public String key;

        @NameInMap("value")
        @Validation(required = true)
        public java.util.List<String> value;

        @NameInMap("extra")
        @Validation(required = true)
        public java.util.Map<String, String> extra;

        public static ComplexRequestConfigs build(java.util.Map<String, ?> map) {
            ComplexRequestConfigs self = new ComplexRequestConfigs();
            return TeaModel.build(map, self);
        }

        public ComplexRequestConfigs setKey(String key) {
            this.key = key;
            return this;
        }
        public String getKey() {
            return this.key;
        }

        public ComplexRequestConfigs setValue(java.util.List<String> value) {
            this.value = value;
            return this;
        }
        public java.util.List<String> getValue() {
            return this.value;
        }

        public ComplexRequestConfigs setExtra(java.util.Map<String, String> extra) {
            this.extra = extra;
            return this;
        }
        public java.util.Map<String, String> getExtra() {
            return this.extra;
        }

    }

    public static class ComplexRequestPart extends TeaModel {
        /**
         * <p>PartNumber</p>
         */
        @NameInMap("PartNumber")
        public String partNumber;

        public static ComplexRequestPart build(java.util.Map<String, ?> map) {
            ComplexRequestPart self = new ComplexRequestPart();
            return TeaModel.build(map, self);
        }

        public ComplexRequestPart setPartNumber(String partNumber) {
            this.partNumber = partNumber;
            return this;
        }
        public String getPartNumber() {
            return this.partNumber;
        }

    }

}
