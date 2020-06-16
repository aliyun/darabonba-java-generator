// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.test.models.*;

public class Client {

    public String _protocol;
    public String _pathname;
    public Client(Config config) throws Exception {
        this._protocol = config.protocol;
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
                return TeaModel.toModel(new java.util.HashMap<>(), new com.importa.models.RuntimeObject());
                this.Complex3(null);
            } catch (Exception e) {
                if (Tea.isRetryable(e)) {
                    continue;
                }
                throw e;
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

    public java.util.List<String> hello(java.util.Map<String, ?> request, java.util.List<String> strs) throws Exception {
        return Client.array1();
    }

    public static com.importa.models.Request print(TeaRequest reqeust, java.util.List<ComplexRequest> reqs, TeaResponse response, java.util.Map<String, String> val) throws Exception {
    }

    public static void printNull() throws Exception {
        String str = this.templateString();
    }

    public static java.util.List<?> array0(java.util.Map<String, ?> req) throws Exception {
        return new java.util.ArrayList<>();
    }

    public static java.util.List<String> array1() throws Exception {
        return java.util.Arrays.asList(
            "1"
        );
    }

    public String templateString() throws Exception {
        return "/" + _protocol + "";
    }
}
