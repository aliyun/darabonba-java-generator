// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.test.models.*;

public class Client {

    public Client(Config config) {
    }

    public void hello() {
        TeaRequest request_ = new TeaRequest();
        request_.method = "GET";
        request_.pathname = "/";
        request_.headers = TeaConverter.buildMap(
            new TeaPair("host", "www.test.com")
        );
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<>());

        return ;
    }

    public void helloRuntime() {
        java.util.Map<String, Object> runtime_ = new java.util.HashMap<>();

        TeaRequest _lastRequest = null;
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
                request_.method = "GET";
                request_.pathname = "/";
                request_.headers = TeaConverter.buildMap(
                    new TeaPair("host", "www.test.com")
                );
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_);

                return ;
            } catch (Exception e) {
                if (Tea.isRetryable(e)) {
                    continue;
                }
                throw new RuntimeException(e);
            }
        }

        throw new TeaUnretryableException(_lastRequest);
    }

    public void helloVirtualCall(M m) {
        TeaModel.validateParams(m, "m");
        TeaRequest request_ = new TeaRequest();
        request_.method = "GET";
        request_.pathname = "/";
        request_.headers = TeaConverter.buildMap(
            new TeaPair("key", "")
        );
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<>());

        return ;
    }

}
