// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.test.models.*;

public class NameTest implements ImplementsTest {

    public String _protocol;
    public String _pathname;
    public java.util.List<java.util.List<String>> _compleList;
    public java.util.List<Config> _configs;
    public NameTest(Config config) throws Exception {
        this._protocol = config.protocol;
        _configs.set(0, config);
    }

    public com.importa.models.RuntimeObject Complex1(ComplexRequest request, com.importa.Client client) throws Exception {
        TeaModel.validateParams(request, "request");
        java.util.Map<String, Object> runtime_ = TeaConverter.buildMap(
            new TeaPair("timeouted", "retry")
        );

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
                TeaResponse response_ = Tea.doAction(request_, runtime_);

                if (true && true) {
                    throw new TeaRetryableException();
                    return null;
                } else if (true || false) {
                    return new com.importa.models.RuntimeObject();
                }

                client.print(request, "1");
                this.hello(TeaModel.buildMap(request), java.util.Arrays.asList(
                    "1",
                    "2"
                ));
                this.hello(null, null);
                this.Complex3(null);
                return TeaModel.toModel(new java.util.HashMap<>(), new com.importa.models.RuntimeObject());
            } catch (Exception e) {
                if (Tea.isRetryable(e)) {
                    continue;
                }
                throw new RuntimeException(e);
            }
        }

        throw new TeaUnretryableException(_lastRequest);
    }

    public java.util.Map<String, ?> Complex2(ComplexRequest request, java.util.List<String> str, java.util.Map<String, String> val) throws Exception {
        TeaModel.validateParams(request, "request");
        TeaRequest request_ = new TeaRequest();
        String name = "complex";
        com.importa.models.Config config = new com.importa.models.Config();
        com.importa.Client client = new com.importa.Client(config);
        request_.protocol = "HTTP";
        request_.port = 80;
        request_.method = "GET";
        request_.pathname = "/";
        request_.query = TeaConverter.buildMap(
            new TeaPair("date", "2019"),
            new TeaPair("protocol", request_.protocol)
        );
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<>());
    }

    public ComplexRequest Complex3(ComplexRequest request) throws Exception {
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
        TeaResponse response_ = Tea.doAction(request_, new java.util.HashMap<>());

        TeaResponse resp = response_;
        com.importa.models.Request req = com.importa.models.Request.build(TeaConverter.buildMap(
            new TeaPair("accesskey", request.accessKey),
            new TeaPair("region", resp.statusMessage)
        ));
        Client.array0(TeaModel.buildMap(request));
        req.accesskey = "accesskey";
        req.accesskey = request.accessKey;
        Client.printNull();
        com.importa.Client.array(TeaModel.buildMap(request), "1");
        return TeaModel.toModel(TeaConverter.merge(String.class,
            request_.query
        ), new ComplexRequest());
    }

    public static void arrayAssign3(ComplexRequest request, String config) throws Exception {
        request.configs.value.set(0, config);
    }

    public static String mapAccess(ComplexRequest request) throws Exception {
        String configInfo = request.configs.extra.get("name");
        return configInfo;
    }

    public static String mapAccess2(com.importa.models.Request request) throws Exception {
        String configInfo = request.configs.extra.get("name");
        return configInfo;
    }

    public static String mapAccess3() throws Exception {
        java.util.Map<String, java.util.Map<String, String>> data = TeaConverter.buildMap(
            new TeaPair("configs", TeaConverter.buildMap(
                new TeaPair("value", "string")
            ))
        );
        return data.get("configs").get("value");
    }

    public static void mapAssign(ComplexRequest request, String name) throws Exception {
        request.configs.extra.put("name", name);
    }

    public static java.util.List<String> arrayAssign2(String config) throws Exception {
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

    public static java.util.List<String> arrayAssign(String config) throws Exception {
        java.util.List<String> configs = java.util.Arrays.asList(
            "a",
            "b",
            "c"
        );
        configs.set(3, config);
        return configs;
    }

    public static String arrayAccess3(ComplexRequest request) throws Exception {
        String configVal = request.configs.value.get(0);
        return configVal;
    }

    public static String arrayAccess2() throws Exception {
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

    public static String arrayAccess() throws Exception {
        java.util.List<String> configs = java.util.Arrays.asList(
            "a",
            "b",
            "c"
        );
        String config = configs.get(0);
        return config;
    }

    @Override
    public void testSubModel(ComplexRequest.ComplexRequestPart part, java.util.List<java.util.List<String>> complexList) throws Exception {
        return ;
    }

    @Override
    public java.util.List<String> hello(java.util.Map<String, ?> request, java.util.List<String> strs) throws Exception {
        return Client.array1();
    }

    public static com.importa.models.Request print(TeaRequest reqeust, java.util.List<ComplexRequest> reqs, TeaResponse response, java.util.Map<String, String> val) throws Exception {
        return null;
    }

    public static void printNull() throws Exception {
        String str = this.templateString();
    }

    public static java.util.List<?> array0(java.util.Map<String, ?> req) throws Exception {
        Long longTest = 1L;
        Double doubleTest = 1D;
        Float floatTest = 1F;
        return new java.util.ArrayList<>();
    }

    public static java.util.List<String> array1() throws Exception {
        return java.util.Arrays.asList(
            "1"
        );
    }

    @Override
    public String templateString() throws Exception {
        return "/" + _protocol + "";
    }
}
