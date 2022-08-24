package com.aliyun.test;

import com.aliyun.test.models.*;

public interface ImplementsTest {

    com.import.models.RuntimeObject Complex1(ComplexRequest request, com.import.Client client);

    java.util.Map<String, ?> Complex2(ComplexRequest request, java.util.List<String> str, java.util.Map<String, String> val);

    ComplexRequest Complex3(ComplexRequest request);

    void testSubModel(ComplexRequest.ComplexRequestPart part, java.util.List<java.util.List<String>> complexList);

    java.util.List<String> hello(java.util.Map<String, ?> request, java.util.List<String> strs);

    String templateString();

}