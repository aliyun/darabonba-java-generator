// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.darabonba.*;
import com.import.*;
import com.import.models.*;

public class ComplexRequest extends TeaModel {
    @NameInMap("duplicatName")
    @Validation(required = true)
    public com.import.models.ComplexRequest duplicatName;

    @NameInMap("accessKey")
    @Validation(required = true)
    public String accessKey;

    /**
     * <p>Body</p>
     * 
     * <strong>example:</strong>
     * <p>Body</p>
     */
    @NameInMap("Body")
    @Validation(required = true)
    public java.io.InputStream body;

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

    /**
     * <p>Part</p>
     */
    @NameInMap("Part")
    @Deprecated
    public java.util.List<ComplexRequestPart> part;

    @NameInMap("configs")
    @Validation(required = true)
    public ComplexRequestConfigs configs;

    @NameInMap("dict")
    @Validation(required = true)
    public java.util.Map<String, Object> dict;

    @NameInMap("submodelMap")
    @Validation(required = true)
    public java.util.Map<String, com.import.models.Config> submodelMap;

    @NameInMap("array")
    public java.util.List<java.util.List<ComplexRequestArray>> array;

    @NameInMap("array1")
    public java.util.List<java.util.List<String>> array1;

    @NameInMap("array2")
    public java.util.List<Config> array2;

    public static ComplexRequest build(java.util.Map<String, ?> map) {
        ComplexRequest self = new ComplexRequest();
        return TeaModel.build(map, self);
    }

    public ComplexRequest setDuplicatName(com.import.models.ComplexRequest duplicatName) {
        this.duplicatName = duplicatName;
        return this;
    }
    public com.import.models.ComplexRequest getDuplicatName() {
        return this.duplicatName;
    }

    public ComplexRequest setAccessKey(String accessKey) {
        this.accessKey = accessKey;
        return this;
    }
    public String getAccessKey() {
        return this.accessKey;
    }

    public ComplexRequest setBody(java.io.InputStream body) {
        this.body = body;
        return this;
    }
    public java.io.InputStream getBody() {
        return this.body;
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

    @Deprecated
    public ComplexRequest setPart(java.util.List<ComplexRequestPart> part) {
        this.part = part;
        return this;
    }
    public java.util.List<ComplexRequestPart> getPart() {
        return this.part;
    }

    public ComplexRequest setConfigs(ComplexRequestConfigs configs) {
        this.configs = configs;
        return this;
    }
    public ComplexRequestConfigs getConfigs() {
        return this.configs;
    }

    public ComplexRequest setDict(java.util.Map<String, Object> dict) {
        this.dict = dict;
        return this;
    }
    public java.util.Map<String, Object> getDict() {
        return this.dict;
    }

    public ComplexRequest setSubmodelMap(java.util.Map<String, com.import.models.Config> submodelMap) {
        this.submodelMap = submodelMap;
        return this;
    }
    public java.util.Map<String, com.import.models.Config> getSubmodelMap() {
        return this.submodelMap;
    }

    public ComplexRequest setArray(java.util.List<java.util.List<ComplexRequestArray>> array) {
        this.array = array;
        return this;
    }
    public java.util.List<java.util.List<ComplexRequestArray>> getArray() {
        return this.array;
    }

    public ComplexRequest setArray1(java.util.List<java.util.List<String>> array1) {
        this.array1 = array1;
        return this;
    }
    public java.util.List<java.util.List<String>> getArray1() {
        return this.array1;
    }

    public ComplexRequest setArray2(java.util.List<Config> array2) {
        this.array2 = array2;
        return this;
    }
    public java.util.List<Config> getArray2() {
        return this.array2;
    }

    public static class ComplexRequestHeaderListSub extends TeaModel {
        @NameInMap("listSubItemName")
        @Validation(required = true)
        public String listSubItem;

        @NameInMap("listSubItemSubName")
        @Validation(required = true)
        public Config listSubItemSub;

        public static ComplexRequestHeaderListSub build(java.util.Map<String, ?> map) {
            ComplexRequestHeaderListSub self = new ComplexRequestHeaderListSub();
            return TeaModel.build(map, self);
        }

        public ComplexRequestHeaderListSub setListSubItem(String listSubItem) {
            this.listSubItem = listSubItem;
            return this;
        }
        public String getListSubItem() {
            return this.listSubItem;
        }

        public ComplexRequestHeaderListSub setListSubItemSub(Config listSubItemSub) {
            this.listSubItemSub = listSubItemSub;
            return this;
        }
        public Config getListSubItemSub() {
            return this.listSubItemSub;
        }

    }

    public static class ComplexRequestHeaderSubModel extends TeaModel {
        @NameInMap("subModelStr")
        @Validation(required = true)
        public String subModelStr;

        public static ComplexRequestHeaderSubModel build(java.util.Map<String, ?> map) {
            ComplexRequestHeaderSubModel self = new ComplexRequestHeaderSubModel();
            return TeaModel.build(map, self);
        }

        public ComplexRequestHeaderSubModel setSubModelStr(String subModelStr) {
            this.subModelStr = subModelStr;
            return this;
        }
        public String getSubModelStr() {
            return this.subModelStr;
        }

    }

    public static class ComplexRequestHeader extends TeaModel {
        /**
         * <p>The ID of the security group to which you want to assign the instance. Instances in the same security group can communicate with each other. The maximum number of instances that a security group can contain depends on the type of the security group. For more information, see the &quot;Security group limits&quot; section in <a href="https://help.aliyun.com/document_detail/25412.html#SecurityGroupQuota">Limits</a>.</p>
         * <blockquote>
         * <p>Notice:  The network type of the new instance must be the same as that of the security group specified by the <code>SecurityGroupId</code> parameter. For example, if the specified security group is of the VPC type, the new instance is also of the VPC type and you must specify <code>VSwitchId</code>.</p>
         * </blockquote>
         * <p>If you do not use <code>LaunchTemplateId</code> or <code>LaunchTemplateName</code> to specify a launch template, you must specify SecurityGroupId. Take note of the following items:</p>
         * <ul>
         * <li>You can set <code>SecurityGroupId</code> to specify a single security group or set <code>SecurityGroupIds.N</code> to specify one or more security groups. However, you cannot specify both <code>SecurityGroupId</code> and <code>SecurityGroupIds.N</code>.</li>
         * <li>If <code>NetworkInterface.N.InstanceType</code> is set to <code>Primary</code>, you cannot specify <code>SecurityGroupId</code> or <code>SecurityGroupIds.N</code> but can specify <code>NetworkInterface.N.SecurityGroupId</code> or <code>NetworkInterface.N.SecurityGroupIds.N</code>.</li>
         * </ul>
         * 
         * <strong>example:</strong>
         * <p>The name of the region.</p>
         * 
         * <strong>check if is blank:</strong>
         * <p>true</p>
         * 
         * <strong>if can be null:</strong>
         * <p>true</p>
         * 
         * <strong>if sensitive:</strong>
         * <p>true</p>
         */
        @NameInMap("Content")
        @Validation(required = true)
        public String content;

        @NameInMap("listSub")
        @Validation(required = true)
        public java.util.List<ComplexRequestHeaderListSub> listSub;

        @NameInMap("listStr")
        @Validation(required = true)
        public java.util.List<String> listStr;

        @NameInMap("sourceClient")
        @Validation(required = true)
        public com.import.Client sourceClient;

        @NameInMap("sourceConfig")
        @Validation(required = true)
        public com.import.models.Config sourceConfig;

        @NameInMap("subModel")
        @Validation(required = true)
        public ComplexRequestHeaderSubModel subModel;

        @NameInMap("subArray")
        @Validation(required = true)
        public java.util.List<Config> subArray;

        @NameInMap("subMutiArray")
        @Validation(required = true)
        public java.util.List<java.util.List<Config>> subMutiArray;

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

        public ComplexRequestHeader setListSub(java.util.List<ComplexRequestHeaderListSub> listSub) {
            this.listSub = listSub;
            return this;
        }
        public java.util.List<ComplexRequestHeaderListSub> getListSub() {
            return this.listSub;
        }

        public ComplexRequestHeader setListStr(java.util.List<String> listStr) {
            this.listStr = listStr;
            return this;
        }
        public java.util.List<String> getListStr() {
            return this.listStr;
        }

        public ComplexRequestHeader setSourceClient(com.import.Client sourceClient) {
            this.sourceClient = sourceClient;
            return this;
        }
        public com.import.Client getSourceClient() {
            return this.sourceClient;
        }

        public ComplexRequestHeader setSourceConfig(com.import.models.Config sourceConfig) {
            this.sourceConfig = sourceConfig;
            return this;
        }
        public com.import.models.Config getSourceConfig() {
            return this.sourceConfig;
        }

        public ComplexRequestHeader setSubModel(ComplexRequestHeaderSubModel subModel) {
            this.subModel = subModel;
            return this;
        }
        public ComplexRequestHeaderSubModel getSubModel() {
            return this.subModel;
        }

        public ComplexRequestHeader setSubArray(java.util.List<Config> subArray) {
            this.subArray = subArray;
            return this;
        }
        public java.util.List<Config> getSubArray() {
            return this.subArray;
        }

        public ComplexRequestHeader setSubMutiArray(java.util.List<java.util.List<Config>> subMutiArray) {
            this.subMutiArray = subMutiArray;
            return this;
        }
        public java.util.List<java.util.List<Config>> getSubMutiArray() {
            return this.subMutiArray;
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

    public static class ComplexRequestArray extends TeaModel {
        @NameInMap("type")
        public String type;

        @NameInMap("link")
        public String link;

        @NameInMap("text")
        public String text;

        public static ComplexRequestArray build(java.util.Map<String, ?> map) {
            ComplexRequestArray self = new ComplexRequestArray();
            return TeaModel.build(map, self);
        }

        public ComplexRequestArray setType(String type) {
            this.type = type;
            return this;
        }
        public String getType() {
            return this.type;
        }

        public ComplexRequestArray setLink(String link) {
            this.link = link;
            return this;
        }
        public String getLink() {
            return this.link;
        }

        public ComplexRequestArray setText(String text) {
            this.text = text;
            return this;
        }
        public String getText() {
            return this.text;
        }

    }

}
