// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.darabonba.*;
import com.aliyun.darabonba.interceptor.InterceptorChain;
import com.aliyun.darabonba.interceptor.RuntimeOptionsInterceptor;
import com.aliyun.darabonba.interceptor.RequestInterceptor;
import com.aliyun.darabonba.interceptor.ResponseInterceptor;
import com.aliyun.test.models.*;
import com.import.*;
import com.import.models.*;

public class NameTest extends com.import.Client implements ImplementsTest {

    private final static InterceptorChain interceptorChain = InterceptorChain.create();

    public String _protocol;
    public String _pathname;
    public java.util.Map<String, String> _endpointMap;
    public com.import.Client _source;
    public Boolean _boolVirtual;
    public java.util.List<com.import.models.Config> _configs;
    public NameTest(com.import.models.Config config, String secondParam) {
        super(config, secondParam);
        this._protocol = config.protocol;
        this._pathname = secondParam;
        this._boolVirtual = true;
        _configs.set(0, config);
    }

    public RuntimeObject Complex1(com.aliyun.test.models.ComplexRequest request, com.import.Client client) {
        TeaModel.validateParams(request, "request");
        java.util.Map<String, Object> runtime_ = TeaConverter.buildMap(
            new TeaPair("timeouted", "retry"),
            new TeaPair("retry", TeaConverter.buildMap(
                new TeaPair("retryable", "xxx")
            ))
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
                com.aliyun.test.models.Config conf = com.aliyun.test.models.Config.build(TeaConverter.buildMap(
                    new TeaPair("floatNum", 0.1F)
                ));
                conf.floatNum = 1.1F;
                java.util.Map<String, String> mapVal = TeaConverter.buildMap(
                    new TeaPair("test", "ok")
                );
                request_.protocol = _endpointMap.get(_protocol);
                request_.port = request.num;
                request_.method = "GET";
                request_.pathname = "/" + _pathname + "";
                request_.query = TeaConverter.buildMap(
                    new TeaPair("date", "2019")
                );
                TeaRequest reqInstance = request_;
                boolean boolItem = !_boolVirtual;
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_, interceptorChain);

                if (true && true) {
                    return null;
                } else if (true || false) {
                    return new RuntimeObject();
                } else {
                    return null;
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

    public java.util.Map<String, Object> Complex2(com.aliyun.test.models.ComplexRequest request, java.util.List<String> str, java.util.Map<String, String> val, java.util.List<java.util.List<java.util.List<String>>> complexList) {
        TeaModel.validateParams(request, "request");
        TeaRequest request_ = new TeaRequest();
        String name = "complex";
        com.import.models.Config config = new com.import.models.Config();
        com.import.Client client = new com.import.Client(config, "testSecond");
        Request.RequestSubmodel subModel = new Request.RequestSubmodel();
        java.util.List<java.util.List<java.util.List<java.util.List<String>>>> nestingList = java.util.Arrays.asList(
            java.util.Arrays.asList(
                java.util.Arrays.asList(
                    java.util.Arrays.asList(
                        "test"
                    )
                )
            )
        );
        request_.protocol = "HTTP";
        request_.port = 80;
        request_.method = "GET";
        request_.pathname = "/";
        request_.query = TeaConverter.buildMap(
            new TeaPair("date", "2019"),
            new TeaPair("protocol", request_.protocol)
        );
        return new java.util.HashMap<>();
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<String, Object>(), interceptorChain);
    }

    public com.aliyun.test.models.ComplexRequest Complex3(com.aliyun.test.models.ComplexRequest request) {
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

        if (true) {
            throw new TeaRetryableException();
        }

        TeaResponse resp = response_;
        Request req = Request.build(TeaConverter.buildMap(
            new TeaPair("accesskey", request.accessKey),
            new TeaPair("region", resp.statusMessage)
        ));
        NameTest.array0(TeaModel.buildMap(request));
        req.accesskey = "accesskey";
        req.accesskey = request.accessKey;
        NameTest.printNull(Config.class);
        com.import.Client.array(TeaModel.buildMap(request), "1");
        return TeaModel.toModel(TeaConverter.merge(String.class,
            request_.query
        ), new com.aliyun.test.models.ComplexRequest());
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

    public static void arrayAssign3(com.aliyun.test.models.ComplexRequest request, String config) {
        request.configs.value.set(0, config);
        int i = 0;
        request.configs.value.set(i, config);
    }

    public static String mapAccess(com.aliyun.test.models.ComplexRequest request) {
        String configInfo = request.configs.extra.get("name");
        return configInfo;
    }

    public static String mapAccess2(Request request) {
        String configInfo = request.configs.extra.get("name");
        return configInfo;
    }

    public static String mapAccess3() {
        java.util.Map<String, java.util.Map<String, java.util.Map<String, String>>> data = TeaConverter.buildMap(
            new TeaPair("mapAcc", TeaConverter.buildMap(
                new TeaPair("map2", TeaConverter.buildMap(
                    new TeaPair("value", "string")
                ))
            ))
        );
        return data.get("mapAcc").get("map2").get("value");
    }

    public static void mapAssign(com.aliyun.test.models.ComplexRequest request, String name) {
        request.configs.extra.put("name", name);
        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("header", null);
        request.dict = TeaConverter.buildMap(
            new TeaPair("test", "demo")
        );
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
        int i = 3;
        data.get("configs").set(i, config);
        return data.get("configs");
    }

    public static java.util.List<String> arrayAssign(String config) {
        java.util.List<String> configs = java.util.Arrays.asList(
            "a",
            "b",
            "c"
        );
        configs.set(3, config);
        int i = 3;
        configs.set(i, config);
        int i32 = 3;
        configs.set(i32, config);
        long i64 = 3;
        configs.set(i64, config);
        Number num = 3;
        configs.set(num, config);
        return configs;
    }

    public static String arrayAccess3(com.aliyun.test.models.ComplexRequest request) {
        String configVal = request.configs.value.get(0);
        int i = 0;
        configVal = request.configs.value.get(i);
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
        int i = 0;
        i++;
        ++i;
        i--;
        --i;
        config = data.get("configs").get(i);
        return config;
    }

    public static String arrayAccess() {
        java.util.List<String> configs = java.util.Arrays.asList(
            "a",
            "b",
            "c"
        );
        String config = configs.get(0);
        int i = 0;
        config = configs.get(i);
        int i32 = 3;
        config = configs.get(i32);
        long i64 = 3;
        config = configs.get(i64);
        Number num = 3;
        config = configs.get(num);
        return config;
    }

    @Override
    public java.util.List<String> hello(java.util.Map<String, Object> request, java.util.List<String> strs) {
        return NameTest.array1();
    }

    public static Request print(TeaRequest reqeust, java.util.List<com.aliyun.test.models.ComplexRequest> reqs, TeaResponse response, java.util.Map<String, String> val) {
        return new Request();
    }

    public static void printNull(class cls) {
        try {
            String str = this.templateString();
        } catch (TeaException e) {
            String errStr = e.message;
        } finally {
            String _final = "ok";
        }        
        try {
            String strNoCatch = this.templateString();
        } finally {
            String finalNoCatch = "ok";
        }        
    }

    public static java.util.List<Object> array0(java.util.Map<String, Object> req) {
        com.import.models.Config temp = new com.import.models.Config();
        java.util.List<com.import.models.Config> anyArr = java.util.Arrays.asList(
            temp
        );
        return new java.util.ArrayList<>();
    }

    public static java.util.List<String> array1() {
        return java.util.Arrays.asList(
            "1"
        );
    }

    @Override
    public String templateString() {
        return "" + _protocol + "";
    }

    public static java.util.Map<String, Object> returnObj(String params) {
        params = "test";
        return new java.util.HashMap<>();
    }
}
