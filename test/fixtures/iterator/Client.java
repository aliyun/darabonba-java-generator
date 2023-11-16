// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.main;

import com.aliyun.tea.*;

public class Client {

    public Client() throws Exception {
    }


    public Iterable<String> test1() throws Exception {
    }

    public Iterable<String> test2() throws Exception {
        Iterable<String> it = this.test1();
        ArrayList<String> _result = new ArrayList<String>();
        for (String test : it) {
            _result.add(test);
        }
    }

    public String test3(Iterable<String> iter) throws Exception {
        Iterable<String> it = iter;
        String str = "";
        ArrayList<String> _result = new ArrayList<String>();
        for (String i : it) {
            str = "" + str + ", " + i + "";
        }
        return str;
    }

    public void test4(Object test) throws Exception {
    }

    public void test5(Iterable<String> iter) throws Exception {
        test3(iter);
        this.test4(iter);
    }
}
