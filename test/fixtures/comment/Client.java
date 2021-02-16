// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.test.models.*;

public class Client {

    public java.util.List<String> _a;
    /**
      Init Func
    */
    public Client(String a, String b) throws Exception {
        // string declate comment
        String str = "sss";
        // new model instance comment
        Test1 modelInstance = Test1.build(TeaConverter.buildMap(
            new TeaPair("test", "test"),
            //test declare back comment
            new TeaPair("test2", "test2")
        ));
        java.util.List<Object> array = java.util.Arrays.asList(
            // array string comment
            "string",
            // array number comment
            300
        );
    }

    public void testAPI() throws Exception {
        java.util.Map<String, Object> runtime_ = new java.util.HashMap<>();

        TeaRequest _lastRequest = null;
        Exception _lastException = null;
        long _now = System.currentTimeMillis();
        int _retryTimes = 0;
        while (Tea.allowRetry((java.util.Map<String, Object>) runtime_.get("retry"), _retryTimes, _now)) {
            if (_retryTimes > 0) {
                int backoffTime = Tea.getBackoffTime(runtime_.get("backoff"), _retryTimes);
                if (backoffTime > 0) {
                    Tea.sleep(backoffTime);
                }
            }
            _retryTimes = _retryTimes + 1;
            try {
                TeaRequest request_ = new TeaRequest();
                // new model instance comment
                Test1 modelInstance = Test1.build(TeaConverter.buildMap(
                    // test declare front comment
                    new TeaPair("test", "test"),
                    // test2 declare front comment
                    new TeaPair("test2", "test2")
                ));
                // number declare comment
                Integer num = 123;
                // static function call comment
                Client.staticFunc();
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_);

                // static async function call
                Client.testFunc();
                // return comment
                return ;
            } catch (Exception e) {
                if (Tea.isRetryable(e)) {
                    _lastException = e;
                    continue;
                }
                throw new RuntimeException(e);
            }
        }

        throw new TeaUnretryableException(_lastRequest, _lastException);
    }

    public void testAPI2() throws Exception {
        java.util.Map<String, Object> runtime_ = TeaConverter.buildMap(
            // runtime retry comment
            new TeaPair("retry", true)
        );

        TeaRequest _lastRequest = null;
        Exception _lastException = null;
        long _now = System.currentTimeMillis();
        int _retryTimes = 0;
        while (Tea.allowRetry((java.util.Map<String, Object>) runtime_.get("retry"), _retryTimes, _now)) {
            if (_retryTimes > 0) {
                int backoffTime = Tea.getBackoffTime(runtime_.get("backoff"), _retryTimes);
                if (backoffTime > 0) {
                    Tea.sleep(backoffTime);
                }
            }
            _retryTimes = _retryTimes + 1;
            try {
                TeaRequest request_ = new TeaRequest();
                // new model instance comment
                Test3 modelInstance = new Test3();
                // boolean declare comment
                Boolean bool = true;
                if (bool) {
                    //empty if
                } else {
                }

                // api function call comment
                this.testAPI();
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_);

                // empty return comment
            } catch (Exception e) {
                if (Tea.isRetryable(e)) {
                    _lastException = e;
                    continue;
                }
                throw new RuntimeException(e);
            }
        }

        throw new TeaUnretryableException(_lastRequest, _lastException);
    }

    public static void staticFunc() throws Exception {
        java.util.List<Object> a = new java.util.ArrayList<>();
    }

    /**
      testFunc
    */
    public static void testFunc() throws Exception {
        // empty comment1
        // empty comment2
    }
}
