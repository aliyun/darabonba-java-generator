// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.darabonba.*;

public class Client {

    public static void printNull() throws Exception {
        try {
            String str = "test";
        } catch (TeaException err) {
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
        try {
            String str1 = "test";
        } catch (TeaException err) {
            // err.code
        } finally {
            // a
        }        
        try {
            String str2 = "test";
        } catch (TeaException err) {
            // err.code
        } finally {
            // b
            String final2 = "ok";
        }        
    }
}
