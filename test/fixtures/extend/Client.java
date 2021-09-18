// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.tea.interceptor.*;
import com.import.*;
import com.import.models.*;

public class Client extends com.import.Client {

    private final static InterceptorChain interceptorChain = InterceptorChain.create();

    public Client(Config config, String a) throws Exception {
        super(config, a);
    }

    public java.util.Map<String, ?> _request() throws Exception {
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
                try {
                    String in = "try";
                } catch (TeaException e) {
                    String tmp = "catch";
                } catch (Exception _e) {
                    TeaException e = new TeaException(_e.getMessage(), _e);
                    String tmp = "catch";
                }                
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_, interceptorChain);

                throw new TeaRetryableException();
                return null;
            } catch (Exception e) {
                if (Tea.isRetryable(e)) {
                    _lastException = e;
                    continue;
                }
                throw e;
            }
        }
        throw new TeaUnretryableException(_lastRequest, _lastException);
    }

    public void addRuntimeOptionsInterceptor(RuntimeOptionsInterceptor interceptor) {
        interceptorChain.addRuntimeOptionsInterceptor(interceptor);
    }

    public void addRequestInterceptor(RequestInterceptor interceptor) {
        interceptorChain.addRequestInterceptor(interceptor);
    }

    public void addResponseInterceptor(ResponseInterceptor interceptor) {
        interceptorChain.addResponseInterceptor(interceptor);
    }

    public void print() throws Exception {
        java.util.Map<String, String> mapAccess = TeaConverter.buildMap(
            new TeaPair("test", "ok")
        );
        mapAccess.put("test", "null");
        mapAccess.get("test");
        java.util.Map<String, Object> tmp = null;
        if (!true) {
        }

        return ;
    }
}
