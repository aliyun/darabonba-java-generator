// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.tea.*;

public class ComplexRequest extends TeaModel {
    @NameInMap("accessKey")
    @Validation(required = true)
    public String accessKey;

    @NameInMap("complexList")
    @Validation(required = true)
    public java.util.List<java.util.List<java.util.Map<String, String>>> complexList;

    // Body
    // body
    @NameInMap("Body")
    @Validation(required = true)
    public java.io.InputStream body;

    @NameInMap("UserPsssrivileges")
    public java.util.Map<String, java.util.List<java.util.Map<String, String>>> userTest;

    // Strs
    @NameInMap("Strs")
    @Validation(required = true)
    public java.util.List<String> strs;

    // header
    @NameInMap("header")
    @Validation(required = true)
    public ComplexRequestHeader header;

    @NameInMap("num")
    @Validation(required = true)
    public Integer num;

    @NameInMap("client")
    @Validation(required = true)
    public com.importa.Client client;

    @NameInMap("configs")
    @Validation(required = true)
    public ComplexRequestConfigs configs;

    // Part
    @NameInMap("Part")
    public java.util.List<ComplexRequestPart> part;

    public static ComplexRequest build(java.util.Map<String, ?> map) throws Exception {
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

    public ComplexRequest setComplexList(java.util.List<java.util.List<java.util.Map<String, String>>> complexList) {
        this.complexList = complexList;
        return this;
    }
    public java.util.List<java.util.List<java.util.Map<String, String>>> getComplexList() {
        return this.complexList;
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

    public ComplexRequest setNum(Integer num) {
        this.num = num;
        return this;
    }
    public Integer getNum() {
        return this.num;
    }

    public ComplexRequest setClient(com.importa.Client client) {
        this.client = client;
        return this;
    }
    public com.importa.Client getClient() {
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

    public static class ComplexRequestHeader extends TeaModel {
        // Body
        @NameInMap("Content")
        @Validation(required = true)
        public String content;

        public static ComplexRequestHeader build(java.util.Map<String, ?> map) throws Exception {
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

        public static ComplexRequestConfigs build(java.util.Map<String, ?> map) throws Exception {
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
        // PartNumber
        @NameInMap("PartNumber")
        public String partNumber;

        public static ComplexRequestPart build(java.util.Map<String, ?> map) throws Exception {
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
