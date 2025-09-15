package com.aliyun.test;

import com.aliyun.test.models.*;

public interface ImplementsTest {

    RuntimeObject Complex1(com.aliyun.test.models.ComplexRequest request, com.import.Client client);

    java.util.Map<String, Object> Complex2(com.aliyun.test.models.ComplexRequest request, java.util.List<String> str, java.util.Map<String, String> val, java.util.List<java.util.List<java.util.List<String>>> complexList);

    com.aliyun.test.models.ComplexRequest Complex3(com.aliyun.test.models.ComplexRequest request);

    java.util.List<String> hello(java.util.Map<String, Object> request, java.util.List<String> strs);

    String templateString();

}