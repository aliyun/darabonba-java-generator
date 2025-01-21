package com.aliyun.test;

import com.aliyun.tea.*;
import com.aliyun.tea.interceptor.InterceptorChain;
import com.aliyun.tea.interceptor.RuntimeOptionsInterceptor;
import com.aliyun.tea.interceptor.RequestInterceptor;
import com.aliyun.tea.interceptor.ResponseInterceptor;
import com.aliyun.test.models.*;

public class Client {

    private final static InterceptorChain interceptorChain = InterceptorChain.create();

    public java.util.List<String> _a;
    /**
     * <b>description</b> :
     * <p>Init Func</p>
     */
    // comment between init and annotation
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

    /**
     * <b>description</b> :
     * <p>testAPI</p>
     */
    //testAPI comment one
    //testAPI comment two
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
                int num = 123;
                // static function call comment
                Client.staticFunc();
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_, interceptorChain);

                // static async function call
                Client.testFunc();
                // return comment
                return ;
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

    // testAPI2 comment
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
                boolean bool = true;
                if (bool) {
                    //empty if
                } else {
                }

                // api function call comment
                this.testAPI();
                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_, interceptorChain);

                // empty return comment
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

    /**
     * <b>description</b> :
     * <p>staticFunc</p>
     */
    // staticFunc comment
    public static void staticFunc() throws Exception {
        java.util.List<Object> a = new java.util.ArrayList<>();
    }

    /**
     * <b>description</b> :
     * <p>testFunc</p>
     */
    // testFunc comment
    public static void testFunc() throws Exception {
        // empty comment1
        // empty comment2
    }

    // Deprecated
    /**
     * <b>description</b> :
     * <p>Queries available Alibaba Cloud regions. The natural language that is used to filter responses. For more information, visit <a href="https://tools.ietf.org/html/rfc7231">RFC 7231</a>. Valid values:</p>
     * <ul>
     * <li>zh-CN: Chinese</li>
     * <li>en-US: English</li>
     * <li>ja: Japanese</li>
     * </ul>
     * <p>Default value: zh-CN.</p>
     * <blockquote>
     * <p>这是Note的内容</p>
     * </blockquote>
     * <blockquote>
     * <p>Notice: 这是注意的内容</p>
     * </blockquote>
     * 
     * <b>summary</b> : 
     * <p>Queries available Alibaba Cloud regions. The natural language that is used to filter responses. For more information, visit <a href="https://tools.ietf.org/html/rfc7231">RFC 7231</a>. Valid values:</p>
     * <ul>
     * <li>zh-CN: Chinese</li>
     * <li>en-US: English</li>
     * <li>ja: Japanese</li>
     * </ul>
     * 
     * @deprecated deprecatedFunc is deprecated.
     * 
     * @param test string
     * @param _test string
     * @return void
     * 
     * @throws InternalError Server error. 500 服务器端出现未知异常。
     * @throws StackNotFound The Stack (%(stack_name)s) could not be found.  404 资源栈不存在。
     */
    @Deprecated
    // Deprecated
    public static void deprecatedFunc(String test, String _test) throws Exception {
        // empty comment1
        // empty comment2
    }

    /**
     * <b>summary</b> : 
     * <p>annotation test summary
     * summary description1
     * summary description2</p>
     * 
     * @deprecated test is deprecated, use xxx instead.
     * deprecated description1
     * deprecated description2
     * 
     * @param test string param1
     * @param _test string param2
     * @return void
     * 
     * @throws InternalError Server error. 500 服务器端出现未知异常。
     */
    @Deprecated
    public static void multiLineAnnotation(String test, String _test) throws Exception {
    }

    /**
     * @deprecated deprecated test for line break.
     * 
     * @param test string param1
     * param test for line break.
     * @param _test string param2
     * @return void
     * return test for line break.
     * 
     * @throws InternalError Server error. 500 服务器端出现未知异常。
     * throws test for line break.
     */
    @Deprecated
    public static void lineBreakAnnotation(String test, String _test) throws Exception {
    }
}
