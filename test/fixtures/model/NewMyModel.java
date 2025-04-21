// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test.models;

import com.aliyun.tea.*;

public class NewMyModel extends TeaModel {
    @NameInMap("object")
    @Validation(required = true)
    public NewMyModelObject object;

    public static NewMyModel build(java.util.Map<String, ?> map) throws Exception {
        NewMyModel self = new NewMyModel();
        return TeaModel.build(map, self);
    }

    public NewMyModel setObject(NewMyModelObject object) {
        this.object = object;
        return this;
    }
    public NewMyModelObject getObject() {
        return this.object;
    }

    public static class NewMyModelObject extends TeaModel {
        /**
         * <strong>example:</strong>
         * <p>example.com\\wuying\\users</p>
         */
        @NameInMap("Name")
        @Validation(required = true)
        public String name;

        @NameInMap("Num")
        public Integer num;

        public static NewMyModelObject build(java.util.Map<String, ?> map) throws Exception {
            NewMyModelObject self = new NewMyModelObject();
            return TeaModel.build(map, self);
        }

        public NewMyModelObject setName(String name) {
            this.name = name;
            return this;
        }
        public String getName() {
            return this.name;
        }

        public NewMyModelObject setNum(Integer num) {
            this.num = num;
            return this;
        }
        public Integer getNum() {
            return this.num;
        }

    }

}
