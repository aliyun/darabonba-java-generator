// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.darabonba.*;
import com.aliyun.darabonba.interceptor.InterceptorChain;
import com.aliyun.darabonba.interceptor.RuntimeOptionsInterceptor;
import com.aliyun.darabonba.interceptor.RequestInterceptor;
import com.aliyun.darabonba.interceptor.ResponseInterceptor;
import com.aliyun.test.models.*;
import com.aliyun.teautil.*;
import com.aliyun.teautil.models.*;

public class Client {

    private final static InterceptorChain interceptorChain = InterceptorChain.create();

    public String _httpProxy;
    public String _httpsProxy;
    public String _socks5Proxy;
    public String _socks5NetWork;
    public Integer _maxIdleConns;
    public Integer _readTimeout;
    public Integer _connectTimeout;
    public String _noProxy;
    public String _key;
    public String _cert;
    public String _ca;
    public $RetryOptions _retryOptions;
    public Client(Config config) throws Exception {
    }

    public void hello() throws Exception {
        TeaRequest request_ = new TeaRequest();
        request_.method = "GET";
        request_.pathname = "/";
        request_.headers = TeaConverter.buildMap(
            new TeaPair("host", "www.test.com")
        );
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<String, Object>(), interceptorChain);

        return ;
    }

    public String helloRuntime(String bodyType, RuntimeOptions runtime) throws Exception {
        java.util.Map<String, Object> runtime_ = TeaConverter.buildMap(
            new TeaPair("key", com.aliyun.teautil.Common.defaultString(runtime.key, _key)),
            new TeaPair("cert", com.aliyun.teautil.Common.defaultString(runtime.cert, _cert)),
            new TeaPair("ca", com.aliyun.teautil.Common.defaultString(runtime.ca, _ca)),
            new TeaPair("readTimeout", com.aliyun.teautil.Common.defaultNumber(runtime.readTimeout, _readTimeout)),
            new TeaPair("connectTimeout", com.aliyun.teautil.Common.defaultNumber(runtime.connectTimeout, _connectTimeout)),
            new TeaPair("httpProxy", com.aliyun.teautil.Common.defaultString(runtime.httpProxy, _httpProxy)),
            new TeaPair("httpsProxy", com.aliyun.teautil.Common.defaultString(runtime.httpsProxy, _httpsProxy)),
            new TeaPair("noProxy", com.aliyun.teautil.Common.defaultString(runtime.noProxy, _noProxy)),
            new TeaPair("socks5Proxy", com.aliyun.teautil.Common.defaultString(runtime.socks5Proxy, _socks5Proxy)),
            new TeaPair("socks5NetWork", com.aliyun.teautil.Common.defaultString(runtime.socks5NetWork, _socks5NetWork)),
            new TeaPair("maxIdleConns", com.aliyun.teautil.Common.defaultNumber(runtime.maxIdleConns, _maxIdleConns)),
            new TeaPair("retryOptions", _retryOptions),
            new TeaPair("ignoreSSL", runtime.ignoreSSL)
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
                request_.method = "GET";
                request_.pathname = "/";
                request_.headers = TeaConverter.buildMap(
                    new TeaPair("host", "www.test.com")
                );
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_, interceptorChain);

                return "test";
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

    public void helloVirtualCall(M m) throws Exception {
        TeaModel.validateParams(m, "m");
        TeaRequest request_ = new TeaRequest();
        request_.method = "GET";
        request_.pathname = "/";
        request_.headers = TeaConverter.buildMap(
            new TeaPair("key", "")
        );
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<String, Object>(), interceptorChain);

        return ;
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

    public vno vnoPayCallBackNotifyEx() throws Exception {
        return null;
    }
}
