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
    @NameInMap("Body")
    @Validation(required = true)
    public java.io.InputStream body;

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

    // Part
    @NameInMap("Part")
    public java.util.List<ComplexRequestPart> part;

    public static ComplexRequest build(java.util.Map<String, ?> map) throws Exception {
        ComplexRequest self = new ComplexRequest();
        return TeaModel.build(map, self);
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

    }

    public static class ComplexRequestPart extends TeaModel {
        // PartNumber
        @NameInMap("PartNumber")
        public String partNumber;

        public static ComplexRequestPart build(java.util.Map<String, ?> map) throws Exception {
            ComplexRequestPart self = new ComplexRequestPart();
            return TeaModel.build(map, self);
        }

    }

}
