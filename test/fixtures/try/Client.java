// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;


public class Client {

    public static void printNull() throws Exception {
        try {
            String str = "test";
        } catch (TeaException err) {
            String test = err.message;
        } catch (Exception _err) {
            TeaException err = new TeaException(_err.getMessage(), _err);
            String test = err.message;
        } finally {
            String _final = "ok";
        }        
    }

    public static void testTry() throws Exception {
        try {
            String str = "test";
        } finally {
            String _final = "ok";
        }        
    }
}
