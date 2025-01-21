// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.tea.interceptor.InterceptorChain;
import com.aliyun.tea.interceptor.RuntimeOptionsInterceptor;
import com.aliyun.tea.interceptor.RequestInterceptor;
import com.aliyun.tea.interceptor.ResponseInterceptor;
import com.aliyun.test.models.*;
import com.import.*;
import com.import.models.*;

public class NameTest implements ImplementsTest {

    private final static InterceptorChain interceptorChain = InterceptorChain.create();

    public String _protocol;
    public String _pathname;
    public java.util.List<java.util.List<String>> _compleList;
    public java.util.List<com.aliyun.test.models.Config> _configs;
    public NameTest(com.aliyun.test.models.Config config) {
        this._protocol = config.protocol;
        _configs.set(0, config);
    }

    public RuntimeObject Complex1(ComplexRequest request, com.import.Client client) {
        TeaModel.validateParams(request, "request");
        java.util.Map<String, Object> runtime_ = TeaConverter.buildMap(
            new TeaPair("timeouted", "retry")
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
                String name = "complex";
                java.util.Map<String, String> mapVal = TeaConverter.buildMap(
                    new TeaPair("test", "ok")
                );
                request_.protocol = _protocol;
                request_.port = request.num;
                request_.method = "GET";
                request_.pathname = "/" + _pathname + "";
                request_.query = TeaConverter.buildMap(
                    new TeaPair("date", "2019")
                );
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_, interceptorChain);

                if (true && true) {
                    throw new TeaRetryableException();
                    return null;
                } else if (true || false) {
                    return new RuntimeObject();
                }

                client.print(request, "1");
                this.hello(TeaModel.buildMap(request), java.util.Arrays.asList(
                    "1",
                    "2"
                ));
                this.hello(null, null);
                this.Complex3(null);
                return TeaModel.toModel(new java.util.HashMap<>(), new RuntimeObject());
            } catch (Exception e) {
                if (Tea.isRetryable(e)) {
                    _lastException = e;
                    continue;
                }
                if (e instanceof TeaException) {
                    throw e;
                }
                throw new TeaException(e.getMessage(), e);
            }
        }
        throw new TeaUnretryableException(_lastRequest, _lastException);
    }

    public java.util.Map<String, Object> Complex2(ComplexRequest request, java.util.List<String> str, java.util.Map<String, String> val) {
        TeaModel.validateParams(request, "request");
        TeaRequest request_ = new TeaRequest();
        String name = "complex";
        com.import.models.Config config = new com.import.models.Config();
        com.import.Client client = new com.import.Client(config);
        request_.protocol = "HTTP";
        request_.port = 80;
        request_.method = "GET";
        request_.pathname = "/";
        request_.query = TeaConverter.buildMap(
            new TeaPair("date", "2019"),
            new TeaPair("protocol", request_.protocol)
        );
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<String, Object>(), interceptorChain);
    }

    public ComplexRequest Complex3(ComplexRequest request) {
        TeaModel.validateParams(request, "request");
        TeaRequest request_ = new TeaRequest();
        String name = "complex";
        request_.protocol = this.templateString();
        request_.port = 80;
        request_.method = "GET";
        request_.pathname = "/";
        request_.body = Tea.toReadable("body");
        request_.query = TeaConverter.buildMap(
            new TeaPair("date", "2019")
        );
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<String, Object>(), interceptorChain);

        TeaResponse resp = response_;
        Request req = Request.build(TeaConverter.buildMap(
            new TeaPair("accesskey", request.accessKey),
            new TeaPair("region", resp.statusMessage)
        ));
        NameTest.array0(TeaModel.buildMap(request));
        req.accesskey = "accesskey";
        req.accesskey = request.accessKey;
        NameTest.printNull();
        com.import.Client.array(TeaModel.buildMap(request), "1");
        return TeaModel.toModel(TeaConverter.merge(String.class,
            request_.query
        ), new ComplexRequest());
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

    public static void arrayAssign3(ComplexRequest request, String config) {
        request.configs.value.set(0, config);
    }

    public static String mapAccess(ComplexRequest request) {
        String configInfo = request.configs.extra.get("name");
        return configInfo;
    }

    public static String mapAccess2(Request.RequestConfigs configs) {
        String configInfo = configs.extra.get("name");
        return configInfo;
    }

    public static String mapAccess3() {
        java.util.Map<String, java.util.Map<String, String>> data = TeaConverter.buildMap(
            new TeaPair("configs", TeaConverter.buildMap(
                new TeaPair("value", "string")
            ))
        );
        return data.get("configs").get("value");
    }

    public static void mapAssign(ComplexRequest request, String name) {
        request.configs.extra.put("name", name);
    }

    public static java.util.List<String> arrayAssign2(String config) {
        java.util.Map<String, java.util.List<String>> data = TeaConverter.buildMap(
            new TeaPair("configs", java.util.Arrays.asList(
                "a",
                "b",
                "c"
            ))
        );
        data.get("configs").set(3, config);
        return data.get("configs");
    }

    public static java.util.List<String> arrayAssign(String config) {
        java.util.List<String> configs = java.util.Arrays.asList(
            "a",
            "b",
            "c"
        );
        configs.set(3, config);
        return configs;
    }

    public static String arrayAccess3(ComplexRequest request) {
        String configVal = request.configs.value.get(0);
        return configVal;
    }

    public static String arrayAccess2() {
        java.util.Map<String, java.util.List<String>> data = TeaConverter.buildMap(
            new TeaPair("configs", java.util.Arrays.asList(
                "a",
                "b",
                "c"
            ))
        );
        String config = data.get("configs").get(0);
        return config;
    }

    public static String arrayAccess() {
        java.util.List<String> configs = java.util.Arrays.asList(
            "a",
            "b",
            "c"
        );
        String config = configs.get(0);
        return config;
    }

    @Override
    public void testSubModel(ComplexRequest.ComplexRequestPart part, java.util.List<java.util.List<String>> complexList) {
        return ;
    }

    @Override
    public java.util.List<String> hello(java.util.Map<String, Object> request, java.util.List<String> strs) {
        return NameTest.array1();
    }

    public static Request print(TeaRequest reqeust, java.util.List<ComplexRequest> reqs, TeaResponse response, java.util.Map<String, String> val) {
        return null;
    }

    public static void printNull() {
        String str = this.templateString();
    }

    public static void conflict(com.import.models.Config sconf, com.aliyun.test.models.Config conf) {
        sconf.protocol = conf.protocol;
    }

    public static java.util.List<Object> array0(java.util.Map<String, Object> req) {
        long longTest = 1L;
        double doubleTest = 1D;
        float floatTest = 1F;
        return new java.util.ArrayList<>();
    }

    public static java.util.List<String> array1() {
        return java.util.Arrays.asList(
            "1"
        );
    }

    @Override
    public String templateString() {
        return "/" + _protocol + "";
    }
}
